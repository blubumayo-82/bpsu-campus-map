/**
 * BPSU Main Campus Interactive 2D Navigation Engine (BS Data Science Project)
 * ==========================================================================
 * SECTION 1: GRAPH DATA & CAMPUS DIRECTORY (Adjacency List & Buildings)
 * SECTION 2: SHORTEST PATH ALGORITHM (Dijkstra Implementation & Route Steps)
 * SECTION 3: MAP & UI CONTROLS (SVG Pan/Zoom, Search, Evacuation Drill)
 * ==========================================================================
 */

// =============================================================================
// SECTION 1: GRAPH DATA & CAMPUS DIRECTORY
// =============================================================================
const campusBuildings = {
  GATE: { name: 'East Gate', desc: 'Main Campus Entrance & Guardhouse', rooms: 'Security Desk, RFID Turnstiles, Visitor Log Kiosk', evac: 'ZONE4', aliases: ['gate', 'entrance', 'exit', 'east gate'] },
  HM_LAB: { name: 'HM Lab', desc: 'Hospitality Management Kitchen Facility', rooms: 'Commercial Hot Kitchen, Cold Prep, Dining Hall', evac: 'ZONE4', aliases: ['hm', 'food lab', 'hrm', 'kitchen'] },
  CSG: { name: 'CSG Office', desc: 'Central Student Government Headquarters', rooms: 'Executive Board, Student Council Desk, CSO Office', evac: 'ZONE3', aliases: ['csg', 'council', 'student gov'] },
  ADMIN: { name: 'Admin Bldg.', desc: 'University Administration & Registrar', rooms: 'Registrar, Cashier, Accounting, President Office, HRMO', evac: 'ZONE3', aliases: ['admin', 'registrar', 'cashier', 'accounting'] },
  GAZEBO: { name: 'Hexagon Gazebo', desc: 'Open-Air Student Pavilion & Food Hub', rooms: 'Snack Kiosks, Dining Hub, Charging Stations', evac: 'ZONE4', aliases: ['gazebo', 'food hub', 'kiosk'] },
  COURT: { name: 'Sari-Gamit Court', desc: 'SG Covered Gymnasium & Sports Arena', rooms: 'Basketball Court, Volleyball Arena, Stage, Bleachers', evac: 'ZONE4', aliases: ['court', 'sg court', 'gym', 'sari gamit'] },
  CAHS_ANNEX: { name: 'CAHS Annex', desc: 'Medical Clinic & PE Faculty', rooms: 'Medical Clinic, Dental Clinic, Rooms 109-112, Infirmary', evac: 'ZONE4', aliases: ['clinic', 'dental', 'pe', '109', '110', '111', '112'] },
  SHOP1: { name: 'Machine Shop 1', desc: 'Mechanical Machining & Lathe Bay', rooms: 'Heavy Lathe Machines, Surface Grinders, Tooling Bay', evac: 'ZONE4', aliases: ['shop 1', 'lathe', 'machining'] },
  SHOP2: { name: 'Machine Shop 2', desc: 'Welding & Metal Foundry Bay', rooms: 'SMAW/MIG Welding Booths, Foundry Furnace, Heat Oven', evac: 'ZONE4', aliases: ['shop 2', 'welding', 'foundry'] },
  LIBRARY: { name: 'University Library', desc: 'Central Library & Learning Commons', rooms: 'Circulation Desk, Filipiniana, E-Library, Thesis Stacks', evac: 'ZONE4', aliases: ['library', 'books', 'e-library'] },
  ZONE4: { name: 'Zone 4 Evacuation', desc: 'Evacuation Zone 4 - CAHS Parking Area', rooms: 'Emergency Assembly Area 4 (East Lower Grounds)', evac: 'ZONE4', aliases: ['zone 4', 'cahs parking'] },
  CAHS: { name: 'CAHS Building', desc: 'College of Allied Health Sciences', rooms: 'Nursing Skills Lab, Simulated Hospital Ward, Rooms 201-205', evac: 'ZONE4', aliases: ['cahs', 'nursing', 'health'] },
  AUTOMOTIVE: { name: 'Automotive & Chapel', desc: 'Auto Tech Facility & Ecumenical Chapel', rooms: 'Engine Overhaul Bay, Chassis Shop, Ecumenical Chapel', evac: 'ZONE3', aliases: ['auto', 'automotive', 'chapel'] },
  ZONE3: { name: 'Zone 3 Evacuation', desc: 'Evacuation Zone 3 - Central Parade Grounds', rooms: 'Emergency Assembly Area 3 (Medina Grounds)', evac: 'ZONE3', aliases: ['zone 3', 'medina grounds'] },
  MEDINA: { name: 'Medina Building', desc: 'Educational Support Facility (ESF)', rooms: 'Rooms M101-M106, Audio-Visual Room, Social Sciences', evac: 'ZONE3', aliases: ['medina', 'esf'] },
  OSA: { name: 'OSA Building', desc: 'Office of Student Affairs', rooms: 'Guidance & Counseling, Scholarship Unit, Placement Desk', evac: 'ZONE3', aliases: ['osa', 'guidance', 'scholarship'] },
  COAS: { name: 'COAS (CAS)', desc: 'College of Arts and Sciences (5 Floors)', rooms: 'Rooms 101-108, COMLAB 204, Radio Lab 203, Dance Studio 205, Grad School 304, King Sejong (5th Flr)', evac: 'ZONE3', aliases: ['coas', 'cas', '204', '203', '205', '304', 'king sejong', 'radio lab', 'dance studio'] },
  CCST: { name: 'CCST (CICT)', desc: 'College of Computer Studies', rooms: 'Cisco Networking Lab, Software Labs 1-2, AI Hub, Rooms C101-C205', evac: 'ZONE2', aliases: ['ccst', 'cict', 'it', 'cs', 'comlab', 'cisco'] },
  CAD: { name: 'CAD Building', desc: 'Computer-Aided Drafting & Design', rooms: 'CAD Workstations, 3D Modeling Lab, Blueprint Plotter Room', evac: 'ZONE2', aliases: ['cad', 'drafting', 'design'] },
  CTEC: { name: 'CTEC Building', desc: 'College of Technology', rooms: 'Electrical Power Lab, Electronics Workbenches, Rooms T201-T206', evac: 'ZONE2', aliases: ['ctec', 'technology', 'electronics'] },
  NSTP: { name: 'NSTP Office', desc: 'National Service Training Directorate', rooms: 'ROTC Cadet Post, CWTS Community Service Desk', evac: 'ZONE2', aliases: ['nstp', 'rotc', 'cwts'] },
  CBA: { name: 'CBA Building', desc: 'College of Business and Accountancy', rooms: 'Dean Office, CPA Review Hall, Mock Hotel Suite, Rooms B101-B104', evac: 'ZONE2', aliases: ['cba', 'business', 'accountancy', 'tourism'] },
  ZONE2: { name: 'Zone 2 Evacuation', desc: 'Evacuation Zone 2 - Concert Open Ground', rooms: 'Emergency Assembly Area 2 (Concert Grounds)', evac: 'ZONE2', aliases: ['zone 2', 'concert grounds'] },
  NCEA: { name: 'New CEA Bldg.', desc: 'New Engineering & Architecture Facility', rooms: 'Civil Testing Lab, Fluid Mechanics Lab, Rooms E101-E206', evac: 'ZONE2', aliases: ['ncea', 'new cea', 'engineering'] },
  ARCH: { name: 'Architecture', desc: 'College of Architecture Studios', rooms: 'Design Studios 1-2, 3D Scale Modeling Lab, Critique Hall', evac: 'ZONE1', aliases: ['arch', 'arki', 'architecture'] },
  ZONE1: { name: 'Zone 1 Evacuation', desc: 'Evacuation Zone 1 - Upper Campus Grounds', rooms: 'Emergency Assembly Area 1 (North Open Area)', evac: 'ZONE1', aliases: ['zone 1', 'north evac'] },
  OLD_CEA: { name: 'Old CEA Bldg.', desc: 'Heritage Engineering Classrooms', rooms: 'Classrooms H101-H105, Surveying Archive, Faculty Room', evac: 'ZONE1', aliases: ['old cea', 'heritage cea'] },
  HOSTEL: { name: 'PATVEP Hostel', desc: 'Hostel Lodging & University Canteen', rooms: 'Campus Canteen, Dining Hall, Guest Rooms, Conference Suite', evac: 'ZONE1', aliases: ['hostel', 'patvep', 'canteen'] },
  MEDICINE: { name: 'College of Medicine', desc: 'College of Medicine (COM)', rooms: 'Anatomy Lab, Clinical Simulation Suite, Medical Library', evac: 'ZONE1', aliases: ['medicine', 'med', 'com', 'doctor'] }
};

const nodeCoords = {
  GATE:[240,1565], HM_LAB:[165,1435], CSG:[165,1312], ADMIN:[165,1202], GAZEBO:[375,1445], COURT:[560,1415], CAHS_ANNEX:[830,1435],
  SHOP1:[367,1220], SHOP2:[457,1220], LIBRARY:[570,1220], ZONE4:[670,1230], CAHS:[830,1240], AUTOMOTIVE:[165,970], ZONE3:[430,970],
  MEDINA:[610,970], OSA:[830,970], COAS:[165,680], CCST:[500,675], CAD:[830,680], CTEC:[165,425], NSTP:[490,502], CBA:[495,442],
  ZONE2:[500,327], NCEA:[830,425], ARCH:[830,277], ZONE1:[500,210], OLD_CEA:[500,127], HOSTEL:[500,50], MEDICINE:[830,160],
  D_GATE:[240,1530], D_HM_LAB:[250,1435], D_CSG:[250,1300], D_ADMIN:[250,1200], D_GAZEBO:[330,1445], D_COURT:[670,1415],
  D_CAHS_ANNEX:[750,1435], D_SHOP1:[367,1120], D_SHOP2:[457,1120], D_LIBRARY:[570,1120], D_ZONE4:[700,1230], D_CAHS:[750,1240],
  D_AUTOMOTIVE:[250,970], D_ZONE3:[330,970], D_MEDINA:[670,970], D_OSA:[750,970], D_COAS:[250,680], D_CCST:[330,675],
  D_CAD:[750,680], D_CTEC:[250,425], D_NSTP:[490,535], D_CBA:[380,442], D_ZONE2:[330,327], D_NCEA:[750,425],
  D_ARCH:[750,277], D_ZONE1:[330,210], D_OLD_CEA:[330,127], D_HOSTEL:[330,50], D_MEDICINE:[750,160]
};

const wSpine = [50,88,127,167,210,252,327,425,442,535,675,680,820,970,1120,1200,1300,1435,1445,1530].map(y => { nodeCoords['W'+y] = [290, y]; return 'W'+y; });
const eSpine = [50,88,127,160,167,210,252,277,327,425,442,535,675,680,820,970,1120,1230,1240,1300,1415,1435,1530].map(y => { nodeCoords['E'+y] = [710, y]; return 'E'+y; });

const campusGraph = {};
for (const k in nodeCoords) campusGraph[k] = {};
function addEdge(u, v) {
  const [x1, y1] = nodeCoords[u], [x2, y2] = nodeCoords[v];
  const d = Math.round(Math.hypot(x2 - x1, y2 - y1) * 0.38 * 10) / 10;
  campusGraph[u][v] = d; campusGraph[v][u] = d;
}
Object.keys(campusBuildings).forEach(b => addEdge(b, 'D_' + b));
[
  ['D_GATE','W1530'],['D_HM_LAB','W1435'],['D_CSG','W1300'],['D_ADMIN','W1200'],['D_GAZEBO','W1445'],['D_COURT','E1415'],
  ['D_CAHS_ANNEX','E1435'],['D_SHOP1','W1120'],['D_SHOP2','W1120'],['D_LIBRARY','E1120'],['D_ZONE4','E1230'],['D_CAHS','E1240'],
  ['D_AUTOMOTIVE','W970'],['D_ZONE3','W970'],['D_MEDINA','E970'],['D_OSA','E970'],['D_COAS','W680'],['D_CCST','W675'],
  ['D_CAD','E680'],['D_CTEC','W425'],['D_NSTP','W535'],['D_CBA','W442'],['D_ZONE2','W327'],['D_NCEA','E425'],
  ['D_ARCH','E277'],['D_ZONE1','W210'],['D_OLD_CEA','W127'],['D_HOSTEL','W50'],['D_MEDICINE','E160']
].forEach(([d, c]) => addEdge(d, c));
for (let i = 0; i < wSpine.length - 1; i++) addEdge(wSpine[i], wSpine[i + 1]);
for (let i = 0; i < eSpine.length - 1; i++) addEdge(eSpine[i], eSpine[i + 1]);
[['W1530','E1530'],['W1120','E1120'],['W820','E820'],['W535','E535'],['W252','E252'],['W167','E167'],['W88','E88'],['W50','E50']].forEach(([u,v]) => addEdge(u, v));

// =============================================================================
// SECTION 2: SHORTEST PATH ALGORITHM
// =============================================================================
function findShortestRoute(start, end) {
  if (start === end) return { path: [start], distance: 0 };
  const dist = {}, prev = {}, unvisited = new Set(Object.keys(campusGraph));
  for (const n of unvisited) dist[n] = Infinity;
  dist[start] = 0;

  while (unvisited.size > 0) {
    let curr = null, minDist = Infinity;
    for (const n of unvisited) if (dist[n] < minDist) { minDist = dist[n]; curr = n; }
    if (!curr || minDist === Infinity || curr === end) break;
    unvisited.delete(curr);
    for (const [nb, wt] of Object.entries(campusGraph[curr])) {
      if (unvisited.has(nb) && dist[curr] + wt < dist[nb]) { dist[nb] = dist[curr] + wt; prev[nb] = curr; }
    }
  }
  if (dist[end] === Infinity) return null;
  const path = [];
  for (let at = end; at; at = prev[at]) path.push(at);
  return { path: path.reverse(), distance: Math.round(dist[end]) };
}

function getRouteSteps(path) {
  const steps = [`Start at ${campusBuildings[path[0]]?.name || path[0]}`];
  const corridors = [];
  for (const n of path.slice(1, -1)) {
    if (n.startsWith('W') && !corridors.includes('Main West Corridor')) corridors.push('Main West Corridor');
    if (n.startsWith('E') && !corridors.includes('Main East Corridor')) corridors.push('Main East Corridor');
    if ((n.includes('820') || n.includes('1120') || n.includes('535')) && !corridors.includes('Cross-Campus Walkway')) corridors.push('Cross-Campus Walkway');
  }
  corridors.forEach(c => steps.push(`Follow ${c}`));
  steps.push(`Arrive at ${campusBuildings[path[path.length - 1]]?.name || path[path.length - 1]}`);
  return steps;
}

// =============================================================================
// SECTION 3: MAP & UI CONTROLS
// =============================================================================
let currentScale = 1, panX = 0, panY = 0, activeRoute = null, selectedBldg = null;

function drawMap() {
  const g = document.getElementById('mapTransformGroup');
  if (g) g.setAttribute('transform', `translate(${panX}, ${panY}) scale(${currentScale})`);
}

function centerOnCoords(x, y, zoom = 1.3) {
  const vp = document.getElementById('mapViewport');
  if (!vp) return;
  const rect = vp.getBoundingClientRect();
  currentScale = zoom;
  panX = (rect.width / 2) - (x * (rect.width / 1000));
  panY = (rect.height / 2) - (y * (rect.height / 1650));
  drawMap();
}

function drawRouteLine(path, isEvac = false) {
  const glow = document.getElementById('routeGlowPolyline'), line = document.getElementById('routeInnerPolyline');
  const sPin = document.getElementById('startPinMarker'), dPin = document.getElementById('destPinMarker');
  if (!glow || !line) return;
  if (!path || path.length < 2) {
    glow.setAttribute('points', ''); line.setAttribute('points', '');
    glow.style.opacity = line.style.opacity = '0';
    if (sPin) sPin.style.opacity = '0'; if (dPin) dPin.style.opacity = '0';
    return;
  }
  const pts = path.map(k => `${nodeCoords[k][0]},${nodeCoords[k][1]}`).join(' ');
  glow.setAttribute('points', pts); line.setAttribute('points', pts);
  glow.setAttribute('stroke', isEvac ? '#eab308' : '#ef4444');
  glow.style.opacity = line.style.opacity = '1';
  const [sX, sY] = nodeCoords[path[0]], [dX, dY] = nodeCoords[path[path.length - 1]];
  if (sPin) { sPin.setAttribute('transform', `translate(${sX},${sY})`); sPin.style.opacity = '1'; }
  if (dPin) { dPin.setAttribute('transform', `translate(${dX},${dY})`); dPin.style.opacity = '1'; }
  centerOnCoords((sX + dX) / 2, (sY + dY) / 2, 1.15);
}

function selectBuilding(id) {
  const bldg = campusBuildings[id];
  if (!bldg) return;
  selectedBldg = id;
  document.querySelectorAll('.building-block').forEach(el => el.classList.remove('selected'));
  const bldgEl = document.getElementById(`bldg-${id}`);
  if (bldgEl) bldgEl.classList.add('selected');

  document.getElementById('bldgOfficialName').textContent = bldg.name;
  document.getElementById('bldgCodeBadge').textContent = id;
  document.getElementById('bldgDescText').textContent = bldg.desc;
  document.getElementById('bldgRoomsText').innerHTML = `<strong>KEY ROOMS & OFFICES:</strong> ${bldg.rooms}`;
  document.getElementById('bldgEvacText').textContent = `Nearest Evacuation: ${campusBuildings[bldg.evac]?.name || bldg.evac}`;
  document.getElementById('buildingDetailsCard').hidden = false;
  centerOnCoords(nodeCoords[id][0], nodeCoords[id][1], 1.4);
}

function renderRouteUI(start, end, isEvac = false) {
  const result = findShortestRoute(start, end);
  if (!result) return alert('No corridor route found.');
  activeRoute = result;
  drawRouteLine(result.path, isEvac);

  document.getElementById('routeDistanceText').textContent = `${result.distance} m`;
  document.getElementById('routeTimeText').textContent = `~${(result.distance / 72).toFixed(1)} min`;
  const steps = getRouteSteps(result.path);
  document.getElementById('routeSegmentsText').textContent = `${steps.length} steps`;
  document.getElementById('routeTypeBadge').textContent = isEvac ? 'EMERGENCY EVACUATION ROUTE' : 'SHORTEST ROUTE';
  document.getElementById('routeFromToText').textContent = `${campusBuildings[start]?.name || start} ➔ ${campusBuildings[end]?.name || end}`;
  document.getElementById('evacuationAlertBanner').hidden = !isEvac;

  const dList = document.getElementById('directionsList');
  dList.innerHTML = '';
  steps.forEach((s, idx) => {
    const li = document.createElement('li');
    li.className = 'direction-step';
    li.innerHTML = `<span class="step-icon-badge">${idx + 1}</span><div class="step-content"><span>${s}</span></div>`;
    dList.appendChild(li);
  });
  document.getElementById('routeSummaryCard').hidden = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const sSel = document.getElementById('startLocationSelect'), dSel = document.getElementById('destinationSelect');
  Object.keys(campusBuildings).sort().forEach(k => {
    sSel.add(new Option(`${k} — ${campusBuildings[k].name}`, k, k === 'GATE', k === 'GATE'));
    dSel.add(new Option(`${k} — ${campusBuildings[k].name}`, k, k === 'COAS', k === 'COAS'));
  });

  document.getElementById('findPathBtn').onclick = () => renderRouteUI(sSel.value, dSel.value, false);
  document.getElementById('evacuationDrillBtn').onclick = () => {
    const start = sSel.value;
    const zones = ['ZONE1', 'ZONE2', 'ZONE3', 'ZONE4'];
    let best = zones[0], minD = Infinity;
    zones.forEach(z => {
      const r = findShortestRoute(start, z);
      if (r && r.distance < minD) { minD = r.distance; best = z; }
    });
    dSel.value = best;
    renderRouteUI(start, best, true);
  };

  document.getElementById('clearRouteBtn').onclick = () => {
    activeRoute = null; drawRouteLine(null);
    document.getElementById('routeSummaryCard').hidden = true;
    currentScale = 1; panX = panY = 0; drawMap();
  };

  document.getElementById('swapLocationsBtn').onclick = () => {
    const tmp = sSel.value; sSel.value = dSel.value; dSel.value = tmp;
    if (activeRoute) renderRouteUI(sSel.value, dSel.value, false);
  };

  document.getElementById('setAsStartBtn').onclick = () => { if (selectedBldg) sSel.value = selectedBldg; };
  document.getElementById('setAsDestBtn').onclick = () => { if (selectedBldg) dSel.value = selectedBldg; };
  document.getElementById('closeDetailsBtn').onclick = () => document.getElementById('buildingDetailsCard').hidden = true;
  document.getElementById('closeSummaryBtn').onclick = () => document.getElementById('routeSummaryCard').hidden = true;

  // Search Autocomplete
  const sInput = document.getElementById('campusSearchInput'), sList = document.getElementById('searchResultsList'), cBtn = document.getElementById('clearSearchBtn');
  sInput.oninput = (e) => {
    const q = e.target.value.trim().toLowerCase();
    cBtn.style.display = q ? 'block' : 'none';
    if (!q) return sList.hidden = true;
    const matches = Object.entries(campusBuildings).filter(([k, b]) =>
      k.toLowerCase().includes(q) || b.name.toLowerCase().includes(q) || b.rooms.toLowerCase().includes(q) || b.aliases.some(a => a.includes(q))
    );
    sList.innerHTML = matches.slice(0, 7).map(([k, b]) => `
      <div class="search-result-item" data-id="${k}">
        <div class="result-item-header"><span class="result-bldg-name">${b.name}</span><span class="result-badge">${k}</span></div>
        <span class="result-bldg-alias">${b.desc}</span>
      </div>`).join('') || '<div class="search-result-item" style="color:#71717a">No buildings or rooms found</div>';
    sList.hidden = false;
    sList.querySelectorAll('.search-result-item').forEach(el => {
      el.onclick = () => { const id = el.dataset.id; if (id) { sInput.value = id; sList.hidden = true; selectBuilding(id); } };
    });
  };
  cBtn.onclick = () => { sInput.value = ''; sList.hidden = true; cBtn.style.display = 'none'; };

  // Category Filter Chips
  document.querySelectorAll('.chip').forEach(chip => {
    chip.onclick = () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.filter;
      document.querySelectorAll('.building-block').forEach(b => {
        const id = b.dataset.id;
        const isEvac = id.startsWith('ZONE');
        const show = (cat === 'all') || (cat === 'Evacuation Zone' && isEvac) || (cat === 'Facility' && ['GATE','GAZEBO','COURT','LIBRARY','HOSTEL'].includes(id)) ||
                     (cat === 'Administration' && ['ADMIN','CSG','OSA','NSTP'].includes(id)) || (cat === 'Academic' && !isEvac && !['GATE','GAZEBO','COURT','LIBRARY','HOSTEL','ADMIN','CSG','OSA','NSTP'].includes(id));
        b.style.opacity = show ? '1' : '0.2';
      });
    };
  });

  // Building Clicks
  document.querySelectorAll('.building-block').forEach(b => b.onclick = () => selectBuilding(b.dataset.id));

  // Map Controls (Zoom, Reset, Fullscreen)
  document.getElementById('zoomInBtn').onclick = () => { currentScale = Math.min(currentScale * 1.25, 4); drawMap(); };
  document.getElementById('zoomOutBtn').onclick = () => { currentScale = Math.max(currentScale * 0.8, 0.45); drawMap(); };
  document.getElementById('resetViewBtn').onclick = () => { currentScale = 1; panX = panY = 0; drawMap(); };
  document.getElementById('fitRouteBtn').onclick = () => {
    const vp = document.getElementById('mapViewport');
    if (!document.fullscreenElement) {
      if (vp.requestFullscreen) vp.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  // Legend Collapse Toggle
  const tLeg = document.getElementById('toggleLegendBtn'), lBody = document.getElementById('legendBody');
  if (tLeg && lBody) {
    tLeg.onclick = (e) => {
      e.stopPropagation();
      const isCol = lBody.classList.toggle('collapsed');
      tLeg.textContent = isCol ? '+' : '−';
    };
  }

  // Pan & Zoom Gestures
  const vp = document.getElementById('mapViewport');
  let isDrag = false, startX = 0, startY = 0;
  vp.onmousedown = (e) => { if (!e.target.closest('.map-floating-controls, .map-legend-hud')) { isDrag = true; startX = e.clientX - panX; startY = e.clientY - panY; vp.classList.add('is-dragging'); } };
  window.onmousemove = (e) => { if (isDrag) { panX = e.clientX - startX; panY = e.clientY - startY; drawMap(); } };
  window.onmouseup = () => { isDrag = false; vp.classList.remove('is-dragging'); };
  vp.onwheel = (e) => { e.preventDefault(); currentScale = Math.min(Math.max(currentScale * (e.deltaY < 0 ? 1.15 : 0.88), 0.45), 4); drawMap(); };
});
