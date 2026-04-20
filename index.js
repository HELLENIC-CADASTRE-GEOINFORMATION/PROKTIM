function OTAStyle (feature){
	return {
		fillColor: 'black',
		weight: 1,
		opacity: 0.50,
		color: 'black',
		fillOpacity: 0,
		lineJoin: 'round'
	}
}
	
function nomoiStyle (feature){
	return {
		color: 'black',
       	weight: 3,
       	opacity: 1,
		dashArray: '8 8 1',
        lineJoin: 'round'
	}				
}
			
function onEachFeature(feature, layer) {
    
    if (feature.properties && feature.properties.popupContent ) {
        layer.bindPopup(feature.properties.popupContent);
    }
};

function featurePopUp(feature, layer) {
	if (feature.properties.st_1 == "ΓΙΑ ΤΗΝ ΠΕΡΙΟΧΗ ΛΕΙΤΟΥΡΓΕΙ ΚΤΗΜΑΤΟΛΟΓΙΚΟ ΓΡΑΦΕΙΟ") {  //501
		layer.bindPopup("<b><small>ΟΤΑ (ΠΡΟ ΠΡ.ΚΑΠΟΔΙΣΤΡΙΑ): </b>" + feature.properties.ota_name + "<br>" +
			"<b>ΔΗΜΟΥ: </b>" + feature.properties.dimos_name + "&nbsp;&nbsp;&nbsp;" +
			"<b>ΠΕΡ.ΕΝΟΤΗΤΑΣ: </b>" + feature.properties.nomos + "<br><br>" +
			"<i><b>" + feature.properties.st_1 + "</b><br></i>" +
			"<b>Ημερομηνία Έναρξης Λειτουργίας:</b>" + feature.properties.ota_st,
			customOptions)
	} else {
		layer.bindPopup("<b><small>ΟΤΑ (ΠΡΟ ΠΡ.ΚΑΠΟΔΙΣΤΡΙΑ): </b>" + feature.properties.ota_name + "<br>" +
			"<b>ΔΗΜΟY: </b>" + feature.properties.dimos_name + "&nbsp;&nbsp;&nbsp;" +
			"<b>ΠΕΡ.ΕΝΟΤΗΤΑΣ: </b>" + feature.properties.nomos + "<br><br>" +
			"<i><b>" + feature.properties.st_1 + "</b><br>" +
			feature.properties.st_2 + "</i><br><br>" +
			"<b><u>ΥΠΟΒΟΛΗ ΔΗΛΩΣΕΩΝ" + "</b></u><br>" +
			"<b>Έναρξη:</b>" + feature.properties.d_start + "<br>" +
			"<b>Λήξη (κάτοικοι Εσωτερικού): </b> " + feature.properties.d_end + "<br>" +
			"<b>Λήξη (κάτοικοι Εξωτερικού): </b> " + feature.properties.d_end_f + "<br>" +
			"<b>Παράταση Λήξης (κάτοικοι Εσωτερικού): </b>" + feature.properties.d_ex_end + "<br>" +
			"<b>Παράταση Λήξης (κάτοικοι Εξωτερικού): </b>" + feature.properties.d_ex_end_f + "<br><br>" +
			"<b><u>ΑΝΑΡΤΗΣΗ/ΥΠΟΒΟΛΗ ΑΙΤΗΣΗΣ ΔΙΟΡΘΩΣΗΣ/ΕΝΣΤΑΣΗΣ" + "</b></u><br>" +
			"<b>Έναρξη : </b>" + feature.properties.ob_start + "<br>" +
			"<b>Λήξη (κάτοικοι Εσωτερικού): </b>" + feature.properties.ob_end + "<br>" +
			"<b>Λήξη (κάτοικοι Εξωτερικού): </b>" + feature.properties.ob_end_f + "<br>" +
			"<b>Παράταση λήξης (κάτοικοι Εξωτερικού): </b>" + feature.properties.ob_e_end_f + "<br>", customOptions)
	}
};

function getColor(d) {
	switch (d) {
		case 'ΑΝΑΜΕΝΕΤΑΙ Η ΑΝΑΡΤΗΣΗ ΚΤΗΜΑΤΟΛΟΓΙΚΩΝ ΣΤΟΙΧΕΙΩΝ': return 'brown';
        
        case 'ΔΕΝ ΕΧΕΙ ΞΕΚΙΝΗΣΕΙ Η ΥΠΟΒΟΛΗ ΔΗΛΩΣΕΩΝ': return 'grey';
        
		case 'ΣΕ ΕΞΕΛΙΞΗ Η ΥΠΟΒΟΛΗ ΔΗΛΩΣΕΩΝ': return 'orange';
        case 'ΣΕ ΕΞΕΛΙΞΗ Η ΑΝΑΡΤΗΣΗ ΚΤΗΜΑΤΟΛΟΓΙΚΩΝ ΣΤΟΙΧΕΙΩΝ - ΥΠΟΒΟΛΗ ΕΝΣΤΑΣΕΩΝ': return '#abdda4';
        case 'ΕΧΕΙ ΛΗΞΕΙ Η ΠΡΟΘΕΣΜΙΑ ΑΙΤΗΣΕΩΝ ΔΙΟΡΘΩΣΗΣ/ΕΝΣΤΑΣΗΣ': return '#fdae61';
    }
}
          
function otaKtimatologioStyle(feature){
	return {
		weight: 1,
		color: 'orange',
		fillOpacity: 0.7
	}
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.st_2),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.5
    }
}          

var map = L.map('map', {
	minZoom: 6,
	maxZoom: 18
}).setView([38.50, 23.50], 7);

var homeButton = {
	lat: 38.5,
	lng: 23.5,
	zoom: 7
};		
 
L.easyButton('<img src="img/Greece-map.png" align="left" style="width:25px">', function(btn, map){
	map.setView([homeButton.lat, homeButton.lng], homeButton.zoom);
}, 'Αρχική μεγέθυνση και κεντράρισμα').addTo(map);
						
kt_wms = L.tileLayer.wms('http://gis.ktimanet.gr/wms/wmsopen/wmsserver.aspx', {
	attribution: '&copy;<a href="https://www.ktimanet.gr/CitizenWebApp/Orthophotographs_Page.aspx" target="_blank" >ΕΛΛΗΝΙΚΟ ΚΤΗΜΑΤΟΛΟΓΙΟ</a>',
	attributionControl: true
});

openStreetMaps = L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: ['a','b','c'],
	transparent: true
}).addTo(map);

OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
			
var OTA_program = L.geoJson(OTA_GR, {style: style});
var OTA_status = L.geoJson(OTA_GR, {style: style});
var customOptions = {
	'maxWidth': '500',
    'width': '300',
    'className' : 'popupCustom'
};      

var KG_icon = L.icon ({
	iconUrl: 'img/KG_DropPin.png',
    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [12, 30] // point of the icon which will correspond to marker's location
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})

var markers = L.markerClusterGroup({
	showCoverageOnHover: false,
	zoomToBoundsOnClick: false,
	maxClusterRadius: '50',
	animate: true,
	spiderfied: true,
	spiderfyOnMaxZoom: true,
	removeOutsideVisibleBounds: true,
	spiderLegPolylineOptions: {weight: 0},
	elementsPlacementStrategy: "original-locations",
	singleMarkerMode: false,
	disableClusteringAtZoom: 10
});

var KG = L.geoJson(KG, {
	pointToLayer: function(feature, latlng) {
        return new L.marker(latlng, {
        	icon: KG_icon
        });
    },
	
	onEachFeature: function (feature, layer) {
		layer.bindPopup("<b><small>Κτηματ. Γραφείο: </b>" + feature.properties.CADOFF_DES + "<br>" +
			"<b>Προϊστάμενος/ένη: </b>" + feature.properties.HEAD + "<br>" +
			"<b>Ταχ.Διεύθυνση: </b>" + feature.properties.ADDRESS + "<br>" +
			"<b>Πόλη: </b>" + feature.properties.CITY + "<br>" +
			"<b>Τηλ.: </b>" + feature.properties.TEL + "<br>" +
			"<b>FAX: </b>" + feature.properties.FAX + "<br>"
		)}
})


markers.addLayer(KG);
markers.on('clustermouseover', function(a) {    
    a.layer.spiderfy();
});

markers.on('clusterclick', function (a) {
	a.layer.zoomToBounds({padding: [20, 20]});
});

var OTALayerGR = L.geoJson(OTA_GR, {
	style: OTAStyle,
	onEachFeature: function (feature, layer) {
		featurePopUp(feature, layer)
	}
})

var Nomoi_line_inland = L.geoJson(NOMOI_LIN_INLAND, {
});

var WMScadastralLayer = L.tileLayer.wms('http://gis.ktimanet.gr/inspire/rest/services/cadastralparcels/CadastralParcelWMS/MapServer/exts/InspireView/service?', {
	layers: 'CP.CadastralParcel',
	tms: false,
	transparent: true,
	format: 'image/png',
	styles: 'Default'
	});

var baseMaps = {
	"<small>Υπόβαθρο: ΕΛΛΗΝΙΚΟ ΚΤΗΜΑΤΟΛΟΓΙΟ": kt_wms,
	"<small>Υπόβαθρο: OPENSTREETMAP": openStreetMaps,
	"<small>Υπόβαθρο: OPENTOPOTMAP": OpenTopoMap
};

var otaAnamoniDiloseon = L.geoJson(OTA_GR, {
	style: {
		weight: 1,
		color: '#000000ff',
		fillOpacity: 0
	},
	filter: function (feature, layer) {
		return feature.properties.st_2 == "ΑΝΑΜΕΝΕΤΑΙ Η ΕΝΑΡΞΗ ΥΠΟΒΟΛΗΣ ΔΗΛΩΣΕΩΝ" || 
		       feature.properties.st_2 == "ΔΕΝ ΕΧΕΙ ΞΕΚΙΝΗΣΕΙ Η ΥΠΟΒΟΛΗ ΔΗΛΩΣΕΩΝ"
	}, 
	onEachFeature: function (feature, layer) {
		featurePopUp(feature, layer)
	}
});

var otaDiloseis = L.geoJson(OTA_GR, {
	style: {
		weight: 1,
		color: '#fee6ce',
		fillOpacity: 0.7
	},
	filter: function (feature, layer) {
		return feature.properties.st_2 == "ΣΕ ΕΞΕΛΙΞΗ Η ΥΠΟΒΟΛΗ ΔΗΛΩΣΕΩΝ"
	}, 
	onEachFeature: function (feature, layer) {
		featurePopUp(feature, layer)
	}
});

var otaDiloseisEk = L.geoJson(OTA_GR, {
	style: {
		weight: 1,
		color: '#fdd0a2',
		fillOpacity: 0.7
	},
	filter: function (feature, layer) {
		return feature.properties.st_2 == "ΕΧΕΙ ΛΗΞΕΙ Η ΠΡΟΘΕΣΜΙΑ ΥΠΟΒΟΛΗΣ ΔΗΛΩΣΕΩΝ. ΣΥΝΕΧΙΖΕΤΑΙ Η ΥΠΟΒΟΛΗ ΕΚΠΡΟΘΕΣΜΩΝ ΔΗΛΩΣΕΩΝ ΚΑΙ ΔΗΛΩΣΕΩΝ ΝΕΩΝ ΔΙΚΑΙΩΜΑΤΩΝ"
	}, 
	onEachFeature: function (feature, layer) {
		featurePopUp(feature, layer)
	}
});

var otaProAnartisi = L.geoJson(OTA_GR, {
	style: {
		weight: 1,
		color: '#fdae6b',
		fillOpacity: 0.7
	},
	filter: function (feature, layer) {
		return feature.properties.st_2 == "ΣΕ ΕΞΕΛΙΞΗ Η ΠΡΟΑΝΑΡΤΗΣΗ ΚΤΗΜΑΤΟΛΟΓΙΚΩΝ ΣΤΟΙΧΕΙΩΝ - ΥΠΟΒΟΛΗ ΑΙΤΗΣΕΩΝ ΕΠΑΝΕΞΕΤΑΣΗΣ ΣΤΟΙΧΕΙΩΝ ΠΡΟΑΝΑΡΤΗΣΗΣ"
	}, 
	onEachFeature: function (feature, layer) {
		featurePopUp(feature, layer)
	}
});

var otaAnamoniAnartisis = L.geoJson(OTA_GR, {
	style: {
		weight: 1,
		color: '#fd8d3c',
		fillOpacity: 0.7
	},
	filter: function (feature, layer) {
		return feature.properties.st_2 == "ΑΝΑΜΕΝΕΤΑΙ Η ΑΝΑΡΤΗΣΗ ΚΤΗΜΑΤΟΛΟΓΙΚΩΝ ΣΤΟΙΧΕΙΩΝ"  || 
		       feature.properties.st_2 == "Η ΠΡΟΑΝΑΡΤΗΣΗ ΚΤΗΜΑΤΟΛΟΓΙΚΩΝ ΣΤΟΙΧΕΙΩΝ ΕΧΕΙ ΛΗΞΕΙ - ANAMENETAI H ANΑΡΤΗΣΗ"
	}, 
	onEachFeature: function (feature, layer) {
		featurePopUp(feature, layer)
		}
});

var otaAnartisi = L.geoJson(OTA_GR, {
	style: {
		weight: 1,
		color: '#f16913',
		fillOpacity: 0.7
	},
	filter: function (feature, layer) {
		return feature.properties.st_2 == "ΣΕ ΕΞΕΛΙΞΗ Η ΑΝΑΡΤΗΣΗ ΚΤΗΜΑΤΟΛΟΓΙΚΩΝ ΣΤΟΙΧΕΙΩΝ - ΥΠΟΒΟΛΗ ΕΝΣΤΑΣΕΩΝ" || 
		       feature.properties.st_2 == "ΣΕ ΕΞΕΛΙΞΗ Η ΑΝΑΡΤΗΣΗ ΚΤΗΜΑΤΟΛΟΓΙΚΩΝ ΣΤΟΙΧΕΙΩΝ - ΥΠΟΒΟΛΗ ΑΙΤΗΣΕΩΝ ΔΙΟΡΘΩΣΗΣ" ||
			   feature.properties.st_2 == "ΕΠΑΝΑΛΗΠΤΙΚΗ ΑΝΑΡΤΗΣΗ ΣΕ ΕΞΕΛΙΞΗ"
	},   
	onEachFeature: function (feature, layer) {
		featurePopUp(feature, layer)
	}
});

var otaAitiseisTelos = L.geoJson(OTA_GR, {
	style: {
		weight: 1,
		color: '#d94801',
		fillOpacity: 0.7
	},
	filter: function (feature, layer) {
		return feature.properties.st_2 == "ΕΧΕΙ ΛΗΞΕΙ Η ΠΡΟΘΕΣΜΙΑ ΑΙΤΗΣΕΩΝ ΔΙΟΡΘΩΣΗΣ / ΕΝΣΤΑΣΗΣ"

	}, 
	onEachFeature: function (feature, layer) {
		featurePopUp(feature, layer)
	}
});

var otaEnstaseisSeEkseliksi = L.geoJson(OTA_GR, {
	style: {
		weight: 1,
		color: '#d94801',
		fillOpacity: 0.7
	},
	filter: function (feature, layer) {
		return feature.properties.st_2 == "ΣΕ ΕΞΕΛΙΞΗ Η ΕΚΔΙΚΑΣΗ ΤΩΝ ΕΝΣΤΑΣΕΩΝ" ||
			   feature.properties.st_2 == "ΣΕ ΕΞΕΛΙΞΗ Η ΔΙΑΔΙΚΑΣΙΑ ΔΗΜΟΣΙΟΠΟΙΗΣΗΣ ΕΚΘΕΣΕΩΝ - ΥΠΟΒΟΛΗΣ ΑΝΑΦΟΡΩΝ ΑΠΟ ΤΟΥΣ ΑΙΤΟΥΝΤΕΣ / ΥΠΟΒΟΛΗΣ ΑΝΤΙΡΡΗΣΕΩΝ ΑΠΟ ΤΟΥΣ ΘΙΓΟΜΕΝΟΥΣ"
	}, 
	onEachFeature: function (feature, layer) {
		featurePopUp(feature, layer)
	}
});


/* var otaEnstaseisTelos = L.geoJson(OTA_GR, {
	style: {
		weight: 1,
		color: '#d94801',
		fillOpacity: 0.7
	},
	filter: function (feature, layer) {
		return feature.properties.st_2 == "ΕΧΕΙ ΟΛΟΚΛΗΡΩΘΕΙ Η ΕΚΔΙΚΑΣΗ ΤΩΝ ΕΝΣΤΑΣΕΩΝ"
		       
	}, 
	onEachFeature: function (feature, layer) {
		featurePopUp(feature, layer)
	}
});
 */

var otaOloklirosiDiadikasiasKtim = L.geoJson(OTA_GR, {
	style: {
		weight: 1,
		color: '#d94801',
		fillOpacity: 0.7
	},
	filter: function (feature, layer) {
		return feature.properties.st_2 == "ΕΧΕΙ ΟΛΟΚΛΗΡΩΘΕΙ Η ΕΚΔΙΚΑΣΗ ΤΩΝ ΕΝΣΤΑΣΕΩΝ" ||
		       feature.properties.st_2 == "ΕΧΕΙ ΟΛΟΚΛΗΡΩΘΕΙ Η ΔΙΑΔΙΚΑΣΙΑ ΚΤΗΜΑΤΟΓΡΑΦΗΣΗΣ ΚΑΙ ΑΝΑΜΕΝΕΤΑΙ Η ΕΝΑΡΞΗ ΛΕΙΤΟΥΡΓΙΑΣ ΤΟΥ ΚΤΗΜΑΤΟΛΟΓΙΚΟΥ ΓΡΑΦΕΙΟΥ ΣΤΗ ΘΕΣΗ ΤΟΥ ΥΠΟΘΗΚΟΦΥΛΑΚ"||
		       feature.properties.st_2 == "ΕΧΕΙ ΛΗΞΕΙ Η ΔΙΑΔΙΚΑΣΙΑ ΚΤΗΜΑΤΟΓΡΑΦΗΣΗΣ ΚΑΙ ΑΝΑΜΕΝΕΤΑΙ Η ΛΕΙΤΟΥΡΓΙΑ ΚΤΗΜΑΤΟΛΟΓΙΚΟΥ ΓΡΑΦΕΙΟΥ" 
    }, 
	onEachFeature: function (feature, layer) {
		featurePopUp(feature, layer)
	}
});

var otaEktosKtimatografisis = L.geoJson(OTA_GR, {
	style: {
		weight: 1,
		color: '#999999',
		fillOpacity: 0.7
	},
	filter: function (feature, layer) {
		return feature.properties.st_1 == "Η ΠΕΡΙΟΧΗ ΔΕΝ ΕΧΕΙ ΕΝΤΑΧΘΕΙ ΣΕ ΠΡΟΓΡΑΜΜΑ ΚΤΗΜΑΤΟΓΡΑΦΗΣΗΣ" ||
		       feature.properties.st_1 == "ΕΙΔΙΚΟ ΚΑΘΕΣΤΩΣ" || 
		       feature.properties.st_1 == "ΓΙΑ ΤΗΝ ΠΕΡΙΟΧΗ ΕΧΕΙ ΑΝΑΣΤΑΛΕΙ Η ΔΙΑΔΙΚΑΣΙΑ ΚΤΗΜΑΤΟΓΡΑΦΗΣΗΣ"
	}, 
	onEachFeature: function (feature, layer) {
		featurePopUp(feature, layer)
	}
});

var otaKtimatologio = L.geoJson(OTA_GR, {
	style: {
		weight: 1,
		color: '#91cf60',
		fillOpacity: 0.7
	},
	filter: function (feature, layer) {
		return feature.properties.st_1 == "ΓΙΑ ΤΗΝ ΠΕΡΙΟΧΗ ΛΕΙΤΟΥΡΓΕΙ ΚΤΗΜΑΤΟΛΟΓΙΚΟ ΓΡΑΦΕΙΟ"
	},
	onEachFeature: function (feature, layer) {
		featurePopUp(feature, layer)
	}
});

var groupedOverlayMaps = {
	"<u>ΔΙΟΙΚΗΤΙΚΑ ΟΡΙΑ</u>": {
		"<small>ΠΕΡ. ΕΝΟΤΗΤΩΝ": Nomoi_line_inland,
		"<small>ΟΤΑ (ΠΡΟ ΠΡ.ΚΑΠΟΔΙΣΤΡΙΑ)": OTALayerGR
	},
	"<u>ΚΤΗΜΑΤΟΓΡΑΦΗΣΗ</u>": {
		"<small><span style=background-color:#ffffff>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;ΑΝΑΜΕΝΕΤΑΙ Η ΕΝΑΡΞΗ ΥΠΟΒΟΛΗΣ ΔΗΛΩΣΕΩΝ": otaAnamoniDiloseon,
		"<small><span style=background-color:#fee6ce>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;ΣΕ ΕΞΕΛΙΞΗ Η ΥΠΟΒΟΛΗ ΔΗΛΩΣΕΩΝ": otaDiloseis,
		"<small><span style=background-color:#fdd0a2>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;ΥΠΟΒΟΛΗ ΕΚΠΡΟΘΕΣΜΩΝ ΔΗΛΩΣΕΩΝ": otaDiloseisEk,
		"<small><span style=background-color:#fdae6b>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;ΠΡΟΑΝΑΡΤΗΣΗ": otaProAnartisi,
		"<small><span style=background-color:#fd8d3c>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;ΑΝΑΜΕΝΕΤΑΙ Η ΑΝΑΡΤΗΣΗ": otaAnamoniAnartisis,
		"<small><span style=background-color:#f16913>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;ΑΝΑΡΤΗΣΗ": otaAnartisi,
		"<small><span style=background-color:#d94801 >&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;ΛΗΞΗ ΠΡΟΘΕΣΜΙΑΣ ΕΝΣΤΑΣΕΩΝ": otaAitiseisTelos,
		"<small><span style=background-color:#d94801 >&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;ΔΙΑΔΙΚΑΣΙΑ ΕΝΣΤΑΣΕΩΝ ΣΕ ΕΞΕΛΙΞΗ": otaEnstaseisSeEkseliksi,
		//"<small><span style=background-color:#d94801 >&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;ΟΛΟΚΛΗΡΩΣΗ ΔΙΑΔΙΚΑΣΙΑΣ ΕΝΣΤΑΣΕΩΝ": otaEnstaseisTelos,
		"<small><span style=background-color:#d94801 >&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;ΟΛΟΚΛΗΡΩΣΗ ΚΤΗΜΑΤΟΓΡΑΦΗΣΗΣ-ΑΝΑΜΟΝΗ ΛΕΙΤΟΥΡΓΙΑΣ": otaOloklirosiDiadikasiasKtim,
		"<small><span style=background-color:#999999>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;ΕΙΔΙΚΕΣ ΠΕΡΙΠΤΩΣΕΙΣ": otaEktosKtimatografisis
	},
	"<u>ΚΤΗΜΑΤΟΛΟΓΙΟ ΣΕ ΛΕΙΤΟΥΡΓΙΑ</u>": {
		"<small><span style=background-color:#91cf60>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;ΠΕΡΙΟΧΕΣ (ΟΤΑ) ΣΕ ΛΕΙΤΟΥΡΓΙΑ": otaKtimatologio,
		"<small><span style=background-color:#ffffff>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;ΚΤΗΜΑΤΟΛΟΓΙΚΑ ΓΡΑΦΕΙΑ</small>": markers,
		"<small><span style=background-color:#ffffff>&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;ΚΤΗΜΑΤΟΛΟΓΙΚΑ ΔΙΑΓΡΑΜΜΑΤΑ (σε μεγάλη μεγένθυση)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;": WMScadastralLayer
		}
};

var options = {
	exclusiveGroups: ["ΥΠΟ ΚΤΗΜΑΤΟΓΡΑΦΗΣΗ"],
	groupCheckboxes: true,
	collapsed: false,
	background: 'grey'
};

L.control.groupedLayers(baseMaps, groupedOverlayMaps, options).addTo(map);

var options = {
	modal: false,
	title: "Επιλογή παραθύρου για μεγέθυνση"
};

var control = L.control.zoomBox(options);
map.addControl(control);


var logo = L.control({ position: 'bottomright' });
logo.onAdd = function (map) {
	var div = L.DomUtil.create('div', 'logo-container');
	div.innerHTML = "<img src='img/LOGO.png' alt='ΕΛΛΗΝΙΚΟ ΚΤΗΜΑΤΟΛΟΓΙΟ' width='180' class='ktimatologio-logo'/>";
	return div;
}
logo.addTo(map);


L.control.scale({
	metric: true,
	imperial: false,
	position: "topleft"
}).addTo(map);
			

var searchControl = L.esri.Geocoding.geosearch(
	{providers: [L.esri.Geocoding.arcgisOnlineProvider({
			countries: ['GRC'],
			categories: ['Address', 'Postal', 'Populated Place', 'Land Features']
			})
		],
	autoComplete: true,
	placeholder: "Αναζήτηση περιοχής ή διεύθυνσης...",
	expanded: 'true',
	position: 'bottomleft',
	collapseAfterResult: 'false',
	useMapBounds: 'false'
	}
).addTo(map);


var results = L.layerGroup().addTo(map);
results.clearLayers();

searchControl.on('results', function (data) {
	results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
	results.addLayer(L.marker(data.results[i].latlng));
    }
});

map.addLayer(markers);
map.addLayer(otaKtimatologio);
map.addLayer(OTALayerGR);