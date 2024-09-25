import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('mapIframe') mapIframe?: ElementRef;
  @ViewChild('searchInput') searchInput?: ElementRef;
  @ViewChild('list') list?: ElementRef;

  private map: any;
  private directionsService: any;
  private directionsRenderer: any;

  constructor(private modalController: ModalController) { }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    const mapElement = this.mapIframe?.nativeElement;
    this.map = new google.maps.Map(mapElement, {
      center: { lat: -29.969804427818424, lng: 30.910702475142774 },
      zoom: 15,
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      map: this.map,
    });
  }
}

// Helper functions

/** Hides a DOM element and optionally focuses on focusEl. */
function hideElement(el: HTMLElement, focusEl?: HTMLElement): void {
  el.style.display = 'none';
  if (focusEl) focusEl.focus();
}

/** Shows a DOM element that has been hidden and optionally focuses on focusEl. */
function showElement(el: HTMLElement, focusEl?: HTMLElement): void {
  el.style.display = 'block';
  if (focusEl) focusEl.focus();
}

/** Determines if a DOM element contains content that cannot be scrolled into view. */
function hasHiddenContent(el: HTMLElement): boolean {
  const noscroll = window.getComputedStyle(el).overflowY.includes('hidden');
  return noscroll && el.scrollHeight > el.clientHeight;
}

/** Format a Place Type string by capitalizing and replacing underscores with spaces. */
function formatPlaceType(str: string): string {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized.replace(/_/g, ' ');
}

/** Initializes an array of zeros with the given size. */
function initArray(arraySize: number): number[] {
  const array: number[] = [];
  while (array.length < arraySize) {
    array.push(0);
  }
  return array;
}

/** Assigns star icons to an object given its rating (out of 5). */
interface Place {
  rating?: number;
  fullStarIcons?: number[];
  halfStarIcons?: number[];
  emptyStarIcons?: number[];
  [key: string]: any; // Allows additional properties
}

function addStarIcons(obj: Place): void {
  if (!obj.rating) return;
  const starsOutOfTen = Math.round(2 * obj.rating);
  const fullStars = Math.floor(starsOutOfTen / 2);
  const halfStars = fullStars !== starsOutOfTen / 2 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  obj.fullStarIcons = initArray(fullStars);
  obj.halfStarIcons = initArray(halfStars);
  obj.emptyStarIcons = initArray(emptyStars);
}

/** Constructs an array of opening hours by day from a PlaceOpeningHours object, */
interface PlaceOpeningHours {
  weekday_text: string[];
}

function parseDaysHours(openingHours: PlaceOpeningHours): { days: string; hours: string }[] {
  const daysHours = openingHours.weekday_text.map((e) => e.split(/\:\s+/))
    .map((e) => ({ 'days': e[0].substr(0, 3), 'hours': e[1] }));

  for (let i = 1; i < daysHours.length; i++) {
    if (daysHours[i - 1].hours === daysHours[i].hours) {
      if (daysHours[i - 1].days.indexOf('-') !== -1) {
        daysHours[i - 1].days = daysHours[i - 1].days.replace(/\w+$/, daysHours[i].days);
      } else {
        daysHours[i - 1].days += ' - ' + daysHours[i].days;
      }
      daysHours.splice(i--, 1);
    }
  }
  return daysHours;
}

// Constants
const ND_NUM_PLACES_INITIAL = 5;
const ND_NUM_PLACES_SHOW_MORE = 5;
const ND_NUM_PLACE_PHOTOS_MAX = 6;
const ND_DEFAULT_POI_MIN_ZOOM = 18;

const ND_MARKER_ICONS_BY_TYPE: { [key: string]: string } = {
  '_default': 'circle',
  'restaurant': 'restaurant',
  'supermarket': 'local_grocery_store',
  'clothing_store': 'local_mall',
  'home_goods_store': 'local_mall',
  'atm': 'atm',
  'library': 'local_library',
};

// Neighborhood Discovery Widget Function
interface NeighborhoodDiscoveryConfig {
  mapOptions: google.maps.MapOptions;
  pois?: Place[];
  mapRadius: number;
  centerMarker?: { icon: string };
}

function NeighborhoodDiscovery(configuration: NeighborhoodDiscoveryConfig) {
  const widget = this;
  const widgetEl = document.querySelector('.neighborhood-discovery') as HTMLElement;

  widget.center = configuration.mapOptions.center;
  widget.places = configuration.pois || [];

  initializeMap();
  initializePlaceDetails();

  function initializeMap(): void {
    const mapOptions = configuration.mapOptions;
    widget.mapBounds = new google.maps.Circle(
      { center: widget.center, radius: configuration.mapRadius }).getBounds();
    mapOptions.restriction = { latLngBounds: widget.mapBounds };
    mapOptions.mapTypeControlOptions = { position: google.maps.ControlPosition.TOP_RIGHT };
    widget.map = new google.maps.Map(widgetEl.querySelector('.map') as HTMLElement, mapOptions);
    widget.map.fitBounds(widget.mapBounds, 0);

    const drawMarker = function (title: string, position: google.maps.LatLngLiteral, fillColor: string, strokeColor: string, labelText: string) {
      return new google.maps.Marker({
        title: title,
        position: position,
        map: widget.map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: fillColor,
          fillOpacity: 1,
          strokeColor: strokeColor,
          labelOrigin: new google.maps.Point(13, 13),
        },
        label: {
          text: labelText,
          color: 'white',
          fontSize: '16px',
        },
      });
    };

    if (configuration.centerMarker && configuration.centerMarker.icon) {
      drawMarker('Home', widget.center, '#1A73E8', '#185ABC', configuration.centerMarker.icon);
    }
  }

  function initializePlaceDetails(): void {
    const detailsService = new google.maps.places.PlacesService(widget.map);

    widget.fetchPlaceDetails = function (placeId: string, fields: string[], callback: (place: Place) => void) {
      detailsService.getDetails({ placeId, fields }, (details: Place) => {
        callback(details);
      });
    };
  }
}

export {
  hideElement,
  showElement,
  hasHiddenContent,
  formatPlaceType,
  initArray,
  addStarIcons,
  parseDaysHours,
  NeighborhoodDiscovery,
};
