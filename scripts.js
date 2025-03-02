// Data for each region
const regions = {
    ab: { title: "Abkhazia" },
    aj: { title: "Ajaria" },
    gu: { title: "Guria" },
    im: { title: "Imereti" },
    ka: { title: "Kakheti" },
    sk: { title: "Samegrelo-Zemo Svaneti" },
    kk: { title: "Kakheti" },
    mm: { title: "Mtskheta-Mtianeti" },
    rl: { title: "Rach'a-Lechkhumi-Kvemo Svaneti" },
    sj: { title: "Samtskhe-Javakheti" },
    sz: { title: "Shida Kartli" },
    tb: { title: "Tbilisi" },
};

// Tooltip state (simple object)
const tooltipData = { region: null, x: 0, y: 0 };

// Grab references
const svg = document.getElementById("mapSvg");
const tooltip = document.getElementById("mapTooltip");
const tooltipHeader = document.getElementById("tooltipHeader");
const svgContainer = document.getElementById("mapContainer");
const tooltipClose = document.getElementById("tooltipClose");

// Remove the "active" class from all SVG paths
const removeActiveClasses = () => {
    const paths = svg.querySelectorAll("path");
    paths.forEach((path) => path.classList.remove("active"));
};

// Event handler: mouseover adds hovered class
const handleMouseOver = (e) => {
    const target = e.target;
    if (target && target.dataset.region) {
        target.classList.add("hovered");
    }
};

// Event handler: mouseout removes hovered class
const handleMouseOut = (e) => {
    const target = e.target;
    if (target && target.dataset.region) {
        target.classList.remove("hovered");
    }
};

// Event handler: click on a region
const handleClick = (e) => {
    const target = e.target;
    if (target && target.dataset.region) {
        removeActiveClasses();
        target.classList.add("active");

        // Get bounding rectangles for positioning the tooltip
        const regionRect = target.getBoundingClientRect();
        const containerRect = svgContainer.getBoundingClientRect();
        tooltipData.region = target.dataset.region;
        // Center the tooltip horizontally above the region
        tooltipData.x =
            regionRect.left - containerRect.left + regionRect.width / 2;
        tooltipData.y = regionRect.top - containerRect.top;
        tooltip.style.left = `${tooltipData.x}px`;
        tooltip.style.top = `${tooltipData.y}px`;

        tooltipHeader.textContent = regions[tooltipData.region].title;
        tooltip.classList.add("active");
    }
};

// Event handler to close the tooltip
const closeTooltip = () => {
    tooltipData.region = null;
    tooltip.classList.remove("active");
    removeActiveClasses();
};

// Add event listeners on the SVG (event delegation)
svg.addEventListener("mouseover", handleMouseOver);
svg.addEventListener("mouseout", handleMouseOut);
svg.addEventListener("click", handleClick);
tooltipClose.addEventListener("click", closeTooltip);