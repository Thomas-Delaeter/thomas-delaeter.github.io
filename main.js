import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';


// Scene, camera_overview, Renderer
const scene = new THREE.Scene();
const camera_overview = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera_follow = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sun (with light)
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFF00,
    emissive: 0xFFFF00,     // glow color
    emissiveIntensity: 100    // increase intensity for more brightness
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const sunLight = new THREE.PointLight(0xFFFFAA, 20, 100);
scene.add(sunLight);

const textureLoader = new THREE.TextureLoader();
const sunGlowTexture = textureLoader.load('https://threejs.org/examples/textures/lensflare/lensflare0.png');
const sunGlowMaterial = new THREE.SpriteMaterial({
  map: sunGlowTexture,
  color: 0xFFFFAA,
  blending: THREE.AdditiveBlending,
  transparent: true,
  opacity: 0.1,
});
sunGlowMaterial.depthTest = false;
const sunGlow = new THREE.Sprite(sunGlowMaterial);
sunGlow.scale.set(8, 8, 1); // Make it bigger than the sun
sun.add(sunGlow);

const planetData = [
    {
        name: "Mercury", radius: 0.2, orbit: 6, color: 0xaaaaaa, speed: 0.00048, cvHeader: "Who am I?",
        cvContent: `<div class="about-card">
                        <h3>Thomas Delaeter</h3>
                        <div class="img-wrapper">
                            <img src="./old_pf.jpg" alt="A picture of me." id="profile-pic">
                        </div>
                        <p class="tagline">Aspiring Machine learning engineer & Data scientist</p>
                        <div class="custom-divider"></div>
                        <p class="description">
                            <strong>Dynamic, driven, and hard-working</strong> young talent with a strong focus on <span class="accent">effective teamwork</span>.
                            I use my <span class="accent">enthusiasm</span> to contribute value to a company whose solutions make a real difference.
                        </p>
                    
                    <div class="contact-card">
                        <div class="contact-row">
                            <a href="https://www.linkedin.com/in/thomasdelaeter/" target="_blank" class="contact-link">
                            <i class="bi bi-linkedin"></i> LinkedIn
                            </a>
                        </div>
                        <div class="contact-row">
                            <a href="mailto:thomas.delaeter@hotmail.com" class="contact-link">
                            <i class="bi bi-envelope-fill"></i> thomas.delaeter@hotmail.com
                            </a>
                        </div>
                        <div class="contact-row contact-color">
                        <i class="bi bi-geo-alt-fill"></i> Ghent
                        </div>
                        <div class="contact-row">
                            <a href="tel:+32123456789" class="contact-link">
                            <i class="bi bi-telephone-fill"></i> +32 468 18 62 20
                            </a>
                        </div>
                    </div>`
    },
    {
        name: "Venus", radius: 0.25, orbit: 7.5, color: 0xffaa00, speed: -0.00035, cvHeader: "Professional History",
        cvContent: `<div class="about-card">
                        <h3 class="section-title"><i class="bi bi-briefcase-fill"></i> Experiences</h3>
                        <div class="custom-divider"></div>
                        <ul class="list-unstyled timeline-list">
                            <li>
                            <span class="timeline-dot"></span>
                            <div class="timeline-content">
                                <strong>EUVIP 2025 conference submission</strong><br>
                                "Semi-Supervised Deep Subspace clustering for Hyperspectral Images"
                                <div class="timeline-details">Jun 2025 | Ghent University</div>
                            </div>
                            </li>
                            <li>
                            <span class="timeline-dot"></span>
                            <div class="timeline-content">
                                <strong>Master's thesis</strong><br>
                                "Semi-Supervised Deep Subspace clustering for Hyperspectral Images"
                                <div class="timeline-details">Sep 2024 - Jun 2025 | Ghent University</div>
                            </div>
                            </li>
                            <li>
                            <span class="timeline-dot"></span>
                            <div class="timeline-content">
                                <strong>Student job</strong><br>
                                Data engineering and data scientist
                                <div class="timeline-details">Summer 2022, 2023, 2024 | SpineWise</div>
                            </div>
                            </li>
                            <li>
                            <span class="timeline-dot"></span>
                            <div class="timeline-content">
                                <strong>School project</strong><br>
                                Computer vision: automated tree mapping and measurement
                                <div class="timeline-details">Feb 2024 - Jun 2024 | Ghent University</div>
                            </div>
                            </li>
                            <li>
                            <span class="timeline-dot"></span>
                            <div class="timeline-content">
                                <strong>ExplainMed</strong><br>
                                Product Development Specialist (Technical Focus)
                                <div class="timeline-details">2023 | Comon Gent proeftuinen</div>
                            </div>
                            </li>
                            <li>
                            <span class="timeline-dot"></span>
                            <div class="timeline-content">
                                <strong>Internship</strong><br>
                                Data engineering and data scientist
                                <div class="timeline-details">Feb 2022 - Jun 2022 | Forcit</div>
                            </div>
                            </li>
                            <li>
                            <span class="timeline-dot"></span>
                            <div class="timeline-content">
                                <strong>Bachelor's thesis</strong><br>
                                <span>"Neutraalpositie bepaling van de rug op basis van dagdagelijkse activiteiten"</span>
                                <div class="timeline-details">Sep 2021 - Jun 2022 | HoGent</div>
                            </div>
                            </li>
                        </ul>
                        </div>
                        `
    },
    {
        name: "Earth", radius: 0.3, orbit: 9, color: 0x0000ff, speed: 0.0003, cvHeader: 'Background',
        cvContent: `<div class="about-card">
                    <h3 class="section-title"><i class="bi bi-mortarboard-fill"></i> Studies</h3>
                    <div class="custom-divider"></div>
                    <ul class="list-unstyled timeline-list">
                        <li>
                        <span class="timeline-dot"></span>
                        <div class="timeline-content">
                            <strong>Transition Program & Master</strong><br>
                            MSc Information Engineering Technology
                            <div class="timeline-details">Sep 2022 - Present | Ghent University</div>
                        </div>
                        </li>                        
                        <li>
                        <span class="timeline-dot"></span>
                        <div class="timeline-content">
                            <strong>Bachelor</strong><br>
                            Applied Computer Sciences
                            <div class="timeline-details">Sep 2019 - Jun 2022 | HoGent</div>
                        </div>
                        </li>
                        <li>
                        <span class="timeline-dot"></span>
                        <div class="timeline-content">
                            <strong>Secondary Education</strong><br>
                            Sciences - Mathematics
                            <div class="timeline-details">Sep 2013 - Jun 2019 | Sint-Godelieve-Instituut Lennik</div>
                        </div>
                        </li>
                    </ul>
                    </div>
                    `
    },
    {
        name: "Mars", radius: 0.28, orbit: 11, color: 0xff2200, speed: 0.00024, cvHeader: "Technical Expertise",
        cvContent: `<div class="about-card">
                        <h3 class="section-title"><i class="bi bi-bar-chart-fill"></i> My Skills</h3>
                        <div class="custom-divider"></div>
                        <div class="img-wrapper">
                            <img src="./skill_radar.png" alt="A radar plot of my skills." class="scaled-img">
                        </div>
                    </div>`
    },
    {
        name: "Jupiter", radius: 0.6, orbit: 14, color: 0xffbb77, speed: 0.00013, cvHeader: "Personal Skills & Languages",
        cvContent: `<div class="about-card">
                    <h3 class="section-title"><i class="bi bi-stars"></i> Personal Skills</h3>
                    <div class="custom-divider"></div>
                    <ul class="list-unstyled d-flex justify-content-between flex-wrap text-center">
                        <li class="d-flex align-items-center"><i class="bi bi-brush-fill mr-2 text-primary"></i>Creative</li>
                        <li class="d-flex align-items-center"><i class="bi bi-lightbulb-fill mr-2 text-warning"></i>Problem Solver</li>
                        <li class="d-flex align-items-center"><i class="bi bi-arrow-up-right-circle-fill mr-2 text-success"></i>Tenacious</li>
                        <li class="d-flex align-items-center"><i class="bi bi-people-fill mr-2 text-info"></i>Mediator</li>
                    </ul>
                    </div>
                    <div class="about-card">
                    <h3 class="section-title"><i class="bi bi-translate"></i> Languages</h3>
                    <div class="custom-divider"></div>
                    <div class="languages-grid">
                        <div><span class="chip-cl">Dutch</span></div>
                        <div>▰▰▰▰▰</div>
                        <div>Native (C2)</div>
                        <div><span class="chip-cl">English</span></div>
                        <div>▰▰▰▰▱</div>
                        <div>Fluent (C1)</div>
                        <div><span class="chip-cl">French</span></div>
                        <div>▰▰▰▱▱</div>
                        <div>Intermediate (B1)</div>
                        <div><span class="chip-cl">German</span></div>
                        <div>▰▱▱▱▱</div>
                        <div>Notions</div>
                    </div>
                    </div>
                    `
    },
    {
        name: "Saturn", radius: 0.5, orbit: 17, color: 0xffddaa, speed: 0.0001, cvHeader: "More About Me",
        cvContent: `<div class="about-card">
                        <h3 class="section-title">Interests</h3>
                        <div class="custom-divider"></div>
                        <div class="hobby-chips">
                            <span class="chip">Volleyball 🏐</span>
                            <span class="chip">Guitar 🎸</span>
                            <span class="chip">Photography 📸</span>
                        </div>
                    </div>
                    <div class="about-card">
                        <h3 class="section-title">Extra</h3>
                        <div class="custom-divider"></div>
                        <div class="hobby-chips">
                            <span class="chip">Drivers License B 🚗</span>
                        </div>
                    </div>
                    <div class="about-card">
                        <h3 class="section-title">References</h3>
                        <div class="custom-divider"></div>
                        <p>Available upon request.</p>
                    </div>`
    },
    {
        name: "Uranus", radius: 0.4, orbit: 20, color: 0x66ffff, speed: -0.00007, cvHeader: "What's Next?",
        cvContent: `<div class="about-card">
                    <h3 class="section-title"><i class="bi bi-rocket-takeoff"></i> Next Steps</h3>
                    <div class="custom-divider"></div>
                    <p>
                        Actively seeking opportunities in <strong>Machine Learning Engineering</strong> or <strong>Data Science</strong>.<br>
                        Let’s build something impactful together!
                    </p>
                    <p>
                        <i>Favorite quote:</i><br>
                        “If art is how we decorate space, then music is how we decorate time.” — Jean-Michel Basquiat
                    </p>
                    </div>
                    `
    },
    {
        name: "Neptune", radius: 0.4, orbit: 23, color: 0x3333ff, speed: 0.00005, cvHeader: "Coming soon!",
        cvContent: `<div class="about-card" style="text-align:center;">
                        <h3 class="section-title"><i class="bi bi-camera-fill"></i> Photo Archives</h3>
                        <div class="custom-divider"></div>
                        <p>
                            I’m currently working on a new project to share my photography and personal archives.
                            <br><br>
                            <strong>Coming soon at:</strong>
                            <br>
                            <span style="color:#3489db;">https://archives.thomas.delaeter.com</span>
                        </p>
                        <a class="archive-btn disabled bp-1" href="#" tabindex="-1" aria-disabled="true">
                            <i class="bi bi-clock-history"></i> Coming Soon
                        </a>
                        <!-- 
                            When the site is live, update the <a> tag above to:
                            <a class="archive-btn" href="https://archives.thomas.delaeter.com" target="_blank">
                            <i class="bi bi-camera"></i> Visit Photo Archives
                            </a>
                        -->
                    </div>
                    `
    },
];

const planets = [];
const planetChaseDistScale = [];

planetData.forEach(p => {
    const geometry = new THREE.SphereGeometry(p.radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: p.color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { orbit: p.orbit, speed: p.speed };
    scene.add(mesh);

    if (p.name === "Saturn") {
        const ringInner = p.radius * 1.15;
        const ringOuter = p.radius * 1.6;
        const ringGeometry = new THREE.RingGeometry(ringInner, ringOuter, 128);
        // Make it look “icy” with a transparent white
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.55
        });
        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);

        // Rotate rings to be tilted like Saturn’s
        ringMesh.rotation.x = Math.PI / 2.5; // adjust as you like!

        mesh.add(ringMesh); // attach rings to Saturn!
    }

    const orbitRadius = p.orbit;
    const solidOrbitGeometry = new THREE.RingGeometry(orbitRadius, orbitRadius + 0.05, 256);
    const solidOrbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -4,
        opacity: 0.28,
        transparent: true
    });
    const solidOrbitMesh = new THREE.Mesh(solidOrbitGeometry, solidOrbitMaterial);
    solidOrbitMesh.rotation.x = Math.PI / 2;

    scene.add(solidOrbitMesh);

    // Dashed line orbit (initially hidden)
    const dashedOrbitLine = createDashedOrbit(orbitRadius + 0.025);
    dashedOrbitLine.visible = false; // only show when active
    dashedOrbitLine.renderOrder = 1;
    scene.add(dashedOrbitLine);

    p._solidOrbitMesh = solidOrbitMesh;
    p._dashedOrbitLine = dashedOrbitLine;

    planets.push(mesh);
    planetChaseDistScale.push(p.orbit / 20); // scale distance relative to orbit
});

// camera_overview + Controls
// camera_overview.position.z = 20;
const controls = new OrbitControls(camera_overview, renderer.domElement);
const radius = 13;
const theta = Math.PI / 4;  // 45 degrees from the Y axis
const phi = Math.PI / 4;    // 45 degrees around the Y axis

camera_overview.position.set(
    radius * Math.sin(theta) * Math.cos(phi),
    radius * Math.cos(theta) - 4,
    radius * Math.sin(theta) * Math.sin(phi)
);
camera_overview.lookAt(0, -2, 0);

camera_follow.position.set(
    0, 5, 0
)
camera_follow.lookAt(2, 2, 2)

let planetToFollow = planets[0];
let activeCamera = camera_overview;
let planetIndex = 0;


const topBox = document.getElementById('top-center-div');
const infoBox = document.getElementById('infoBox');

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        activeCamera = camera_overview;
        controls.object = activeCamera;
        controls.enabled = true;
        infoBox.style.display = 'none'; // hide info
        topBox.style.display = 'flex';
        showMobileArrows(false);
        showExitChaseBtn(false);
        if (clickMeTextMesh) clickMeTextMesh.visible = true;
        if (clickMeTextMesh2) clickMeTextMesh2.visible = true;
        setOverviewTipVisible(true);
        updateOrbitRings()
    }
    if (event.key === 'ArrowDown') {
        activeCamera = camera_follow;
        controls.enabled = false;
        infoBox.style.display = 'block';
        topBox.style.display = 'none';
        showMobileArrows(true);
        showExitChaseBtn(true);
        if (clickMeTextMesh) clickMeTextMesh.visible = false;
        if (clickMeTextMesh2) clickMeTextMesh2.visible = false;
        setOverviewTipVisible(false);
        updateOrbitRings()
    }
    if (event.key === 'ArrowRight') {
        planetIndex = (planetIndex + 1) % planets.length;
        planetToFollow = planets[planetIndex];
        updateActiveDot();
        updateInfoBox();

    }
    if (event.key === 'ArrowLeft') {
        planetIndex = (planetIndex - 1 + planets.length) % planets.length;
        planetToFollow = planets[planetIndex];
        updateActiveDot();
        updateInfoBox();
    }
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
scene.add(ambientLight);

let previousPos = new THREE.Vector3();

function updateInfoBox() {

    document.getElementById('planetName').textContent = planetData[planetIndex].cvHeader || planetData[planetIndex].name;
    document.getElementById('planetStats').innerHTML = planetData[planetIndex].cvContent || '';
}
updateInfoBox();


// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    const isMobile = window.innerWidth < 1000;
    const tooltip = document.getElementById('planetTooltip');

    // --- "click me" wrapping around sun
    const sunRadius = 2;
    const textOrbitRadius = sunRadius + 0.4;
    const tilt = Math.PI / 7;

    if (clickMeTextMesh) {
        const time = Date.now() * 0.6 * 0.001; // slightly faster
        const tilt = Math.PI / 7; // adjust for more/less tilt

        const x = sun.position.x + textOrbitRadius * Math.cos(time);
        const y = sun.position.y + textOrbitRadius * Math.sin(tilt) * Math.sin(time);
        const z = sun.position.z + textOrbitRadius * Math.cos(tilt) * Math.sin(time);

        clickMeTextMesh.position.set(x, y, z);

        // Makes the text "stand up" perpendicular to the sun, facing outward
        clickMeTextMesh.lookAt(
            clickMeTextMesh.position.clone().sub(sun.position).normalize().add(clickMeTextMesh.position)
        );
    }
    if (clickMeTextMesh2) {
        const time = Date.now() * 0.6 * 0.001 + Math.PI; // Offset by 180 degrees
        const x = sun.position.x + textOrbitRadius * Math.cos(time);
        const y = sun.position.y + textOrbitRadius * Math.sin(tilt) * Math.sin(time);
        const z = sun.position.z + textOrbitRadius * Math.cos(tilt) * Math.sin(time);

        clickMeTextMesh2.position.set(x, y, z);
        clickMeTextMesh2.lookAt(
            clickMeTextMesh2.position.clone().sub(sun.position).normalize().add(clickMeTextMesh2.position)
    );
}
    
    if (!isMobile && activeCamera === camera_follow) {
        const planet = planetToFollow;
        const data = planetData[planetIndex];

        // Clone position and lift it above the planet
        const labelPosition = planet.position.clone().add(new THREE.Vector3(0, data.radius + .05, 0));
        labelPosition.project(camera_follow);

        const x = (labelPosition.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-labelPosition.y * 0.5 + 0.5) * window.innerHeight;

        tooltip.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`;
        tooltip.textContent = data.name;
        tooltip.style.display = 'block'
        
    } else {
        tooltip.style.display = 'none';
    }

    if (planetData[planetIndex].name === "Venus") {
        infoBox.classList.add('experiences-active');
        tooltip.style.display = 'none';
    } else {
        infoBox.classList.remove('experiences-active');
        if (!isMobile && activeCamera===camera_follow)
            tooltip.style.display = 'block'
    }

    previousPos.copy(planetToFollow.position);
    const time = Date.now() * 0.001;
    planets.forEach((planet, i) => {
        const orbit = planet.userData.orbit;
        const speed = planet.userData.speed;
        planet.position.set(
            orbit * Math.cos(time * speed * 1000),
            0,
            orbit * Math.sin(time * speed * 1000)
        );
    });

    // Compute Earth velocity direction
    const velocity = planetToFollow.position.clone().sub(previousPos).normalize();
    if (planetData[planetIndex].speed < 0) velocity.negate();
    // Compute velocity-based direction
    const forward = velocity.clone().normalize();
    // Create a sideways (right) vector
    const up = new THREE.Vector3(0, 1, 0);
    const right = new THREE.Vector3().crossVectors(up, forward).normalize();

    // Create custom offset
    const offset = forward.clone()
        .multiplyScalar(-1.5 * planetChaseDistScale[planetIndex])  // behind (1.5)
        .add(up.clone().multiplyScalar(.2))             // above
        .add(right.clone().multiplyScalar(2));         // to the right (plus) left (neg) (.1)

    // Apply offset to camera
    camera_follow.position.copy(planetToFollow.position.clone().add(offset));

    const lookTarget = planetToFollow.position.clone().add(velocity.clone().multiplyScalar(1)).add(new THREE.Vector3(0.02, 0.5, -0.03));
    camera_follow.lookAt(
        (lookTarget.x + sun.position.x) / 3,
        (lookTarget.y + sun.position.y) / 3,
        (lookTarget.z + sun.position.z) / 3
    );

    controls.object = activeCamera;
    renderer.render(scene, activeCamera);
}

// --- PAGINATION DOTS (Clickable + Tooltip with cvHeader) ---

const paginationDotsContainer = document.getElementById('paginationDots');
const tooltip = document.getElementById('planetTooltip');

function renderPaginationDots() {
    paginationDotsContainer.innerHTML = '';
    for (let i = 0; i < planets.length; i++) {
        const dot = document.createElement('span');
        dot.classList.add('pagination-dot');
        if (i === planetIndex) dot.classList.add('active');
        dot.dataset.index = i;

        // Show tooltip with cvHeader on hover
        dot.addEventListener('mouseenter', (e) => {
            const data = planetData[i];
            // Use cvHeader if it exists, otherwise fallback to name
            tooltip.textContent = data.cvHeader || data.name;
            // Get bounding rect for the dot (for positioning)
            const rect = dot.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.top = `${rect.top - 18}px`;
            tooltip.style.transform = "translate(-50%, -100%)";
            tooltip.style.display = 'block';
        });
        dot.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });

        // Click to jump to that planet/tab
        dot.addEventListener('click', () => {
            planetIndex = i;
            planetToFollow = planets[planetIndex];
            updateActiveDot();
            updateInfoBox();
        });

        paginationDotsContainer.appendChild(dot);
    }
}
function updateActiveDot() {
    const dots = paginationDotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('active', i === planetIndex);
    }
    updateOrbitRings()
}
renderPaginationDots();

function updateOrbitRings() {
  planetData.forEach((p, i) => {
    if (p._solidOrbitMesh && p._dashedOrbitLine) {
      if (activeCamera === camera_follow && i === planetIndex) {
        p._solidOrbitMesh.visible = false;
        p._dashedOrbitLine.visible = true;
      } else {
        p._solidOrbitMesh.visible = true;
        p._dashedOrbitLine.visible = false;
      }
    }
  });
}


// In case you programmatically change planetIndex somewhere else, call updateActiveDot();
// --- Mobile Arrow Navigation ---
function triggerArrow(key) {
  const event = new KeyboardEvent('keydown', { key });
  window.dispatchEvent(event);
}

document.querySelector('.left-arrow').addEventListener('click', () => triggerArrow('ArrowLeft'));
document.querySelector('.right-arrow').addEventListener('click', () => triggerArrow('ArrowRight'));

const showMobileArrows = (show) => {
  document.querySelectorAll('.mobile-arrow').forEach(el => {
    el.style.display = show ? 'flex' : 'none';
  });
};
const showExitChaseBtn = (show) => {
  document.getElementById('exitChaseBtn').style.display = show ? 'flex' : 'none';
};

document.getElementById('exitChaseBtn').addEventListener('click', () => {
  // Simulate pressing ArrowUp (overview mode)
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
  showExitChaseBtn(false);
  if (clickMeTextMesh) clickMeTextMesh.visible = true;
  if (clickMeTextMesh2) clickMeTextMesh2.visible = true;
  updateOrbitRings()
});
showExitChaseBtn(false);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera_overview.aspect = window.innerWidth / window.innerHeight;
  camera_overview.updateProjectionMatrix();

  camera_follow.aspect = window.innerWidth / window.innerHeight;
  camera_follow.updateProjectionMatrix();
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

renderer.domElement.addEventListener('pointerdown', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, activeCamera);
    const intersects = raycaster.intersectObject(sun, true);
    if (intersects.length > 0) {
        // Switch to chase cam
        activeCamera = camera_follow;
        controls.enabled = false;
        infoBox.style.display = 'block';
        topBox.style.display = 'none';
        showMobileArrows(true);
        showExitChaseBtn(true);
        if (clickMeTextMesh) clickMeTextMesh.visible = false;
        if (clickMeTextMesh2) clickMeTextMesh2.visible = false;
        setOverviewTipVisible(false);
        updateOrbitRings()
    }
});

const loader = new FontLoader(); // Only one loader
let textMesh;        // Your name text
let clickMeTextMesh; // The "click me" text


// "click me" orbiting the sun
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeo = new TextGeometry('click me', {
        font: font,
        size: 0.32,
        height: 0.04,
        depth: .1,
        curveSegments: 10,
    });
    const material = new THREE.MeshStandardMaterial({
        color: 0xffd580,
        metalness: 0.4,
        roughness: 0.3,
        emissive: 0x222211
    });
    clickMeTextMesh = new THREE.Mesh(textGeo, material);
    textGeo.center();
    scene.add(clickMeTextMesh);
});

let clickMeTextMesh2;
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeo2 = new TextGeometry('click me', {
        font: font,
        size: 0.32,
        height: 0.04,
        depth: .1,
        curveSegments: 10,
    });
    const material2 = new THREE.MeshStandardMaterial({
        color: 0xffd580,
        metalness: 0.4,
        roughness: 0.3,
        emissive: 0x222211
    });
    clickMeTextMesh2 = new THREE.Mesh(textGeo2, material2);
    textGeo2.center();
    scene.add(clickMeTextMesh2);
});

animate();

function setAppHeight() {
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
}
window.addEventListener('resize', setAppHeight);
setAppHeight();

function setOverviewTipVisible(isVisible) {
  const tip = document.getElementById('overview-tip');
  tip.style.opacity = isVisible ? "1" : "0";
  tip.style.pointerEvents = isVisible ? "auto" : "none";
}
setOverviewTipVisible(true);

function createDashedOrbit(radius, color = 0x6ac7f5, dashes = 32) {
  const segments = dashes * 2;
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(
      Math.cos(theta) * radius,
      0,
      Math.sin(theta) * radius
    ));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineDashedMaterial({
    color,
    dashSize: 0.22,
    gapSize: 0.12,
    linewidth: 2, // Note: Only works on some platforms
    transparent: true,
    opacity: 0.85
  });
  const line = new THREE.Line(geometry, material);
  line.computeLineDistances(); // **IMPORTANT** for dashes to show
  return line;
}
