document.addEventListener("DOMContentLoaded", function() {
    // Obtener el elemento donde se mostrarán los textos centrados y los gráficos
    var chartArea = d3.select("#chart-area");
    var occupancyGraphArea = d3.select("#graph-occupancy-area"); // Nueva selección
    var downtimeGraphArea = d3.select("#graph-downtime-area"); // Nueva selección
    var idleGraphArea = d3.select("#graph-idle-time-area"); // Nueva selección
    var waitingGraphArea = d3.select("#graph-waiting-time-area"); // Nueva selección
    var pieGraphArea = d3.select("#pieGraph-area"); // Nueva selección


    // Obtener los datos del JSON
    var jsonData = [
        {
            "production": 17,
            "rejections": 0,
            "rejection_percentage": 2.0,
            "fix_time": 39.989999999999995,
            "delay_due_to_bottleneck": 487.38,
            "accidents": 0,
            "occupancy_per_workstation": [18, 17, 17, 17, 17, 17],
            "downtime_per_workstation": [22.52, 0, 8.76, 1.5, 0, 0.89],
            "idleTime_per_workstation": [0, 0, 0, 0, 0, 0],
            "waitingTime_per_workstation": [163.72, 217.47, 287.77, 350.29, 417.71, 487.39]
        }
    ];

    // Función para crear y agregar un texto centrado al área del gráfico
    function addCenteredText(text) {
        var textElement = document.createElement("div");
        textElement.textContent = text;
        textElement.style.textAlign = "center";
        textElement.style.fontSize = "24px";
        textElement.style.marginTop = "20px";
        chartArea.node().appendChild(textElement);
    }

    // Calcular el porcentaje de aceptación
    var acceptancePercentage = 100.0 - jsonData[0].rejection_percentage;

    // Crear el conjunto de datos para el gráfico de pastel
    var pieData = [
        { label: "Acceptance", value: acceptancePercentage },
        { label: "Rejection", value: jsonData[0].rejection_percentage }
    ];

    // Mostrar los datos
    addCenteredText("Production: " + jsonData[0].production);
    addCenteredText("Rejections: " + jsonData[0].rejections);
    addCenteredText("Rejection Percentage: " + jsonData[0].rejection_percentage + "%");
    addCenteredText("Delay Due to Bottleneck: " + jsonData[0].delay_due_to_bottleneck);
    addCenteredText("Accidents: " + jsonData[0].accidents);

    // Definir escalas y ejes comunes para pie
    var color = d3.scaleOrdinal()
        .domain(["Acceptance", "Rejection"])
        .range(["lightgreen", "red"]);

    // Crear el gráfico de pastel
    var pieWidth = 400;
    var pieHeight = 400;
    var radius = Math.min(pieWidth, pieHeight) / 2;

    var svg = pieGraphArea.append("div").append("svg")
        .attr("width", pieWidth)
        .attr("height", pieHeight)
        .append("g")
        .attr("transform", "translate(" + pieWidth / 2 + "," + pieHeight / 2 + ")");

    var pie = d3.pie()
        .value(function(d) { return d.value; })
        .sort(null);

    var path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var arc = svg.selectAll(".arc")
        .data(pie(pieData))
        .enter().append("g")
        .attr("class", "arc");

    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return color(d.data.label); });

    arc.append("text")
        .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
        .attr("dy", "0.35em")
        .text(function(d) { return d.data.label + ": " + d.data.value.toFixed(2) + "%"; });

    // Definir escalas y ejes comunes
    var xScale = d3.scaleBand()
        .domain(d3.range(6))
        .range([0, 325])
        .padding(0.9);

    var yScale = d3.scaleLinear()
        .range([100, 0]);

    var xAxis = d3.axisBottom(xScale)
        .tickFormat((d, i) => "W" + (i + 1));

    var color = d3.scaleOrdinal()
        .domain(["occupancy", "downtime", "idleTime", "waitingTime"])
        .range(["lightblue", "pink", "lightgreen", "yellow"]);

    // Crear gráficos y ejes para cada tipo de tiempo
    ["occupancy", "downtime", "idleTime", "waitingTime"].forEach(function(type, index) { //iterar para cada grafico
        var data = jsonData[0][type + "_per_workstation"];

        console.log("Tipo de gráfico:", type);
        console.log("Datos:", data);
        var yMax = d3.max(data);
        yScale.domain([0, yMax]);

        if(type == "occupancy"){
            var svg = occupancyGraphArea.append("div").append("svg")
            .attr("width", 400)
            .attr("height", 400);
        }
        if(type == "downtime"){
            var svg = downtimeGraphArea.append("div").append("svg")
            .attr("width", 400)
            .attr("height", 400);
        }
        if(type == "idleTime"){
            var svg = idleGraphArea.append("div").append("svg")
            .attr("width", 400)
            .attr("height", 400);
        }
        if(type == "waitingTime"){
            var svg = waitingGraphArea.append("div").append("svg")
            .attr("width", 400)
            .attr("height", 400);
        }
        

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 50 + 25)
            .attr("y", (d) => yScale(d))
            .attr("width", 20)
            .attr("height", (d) => 100 - yScale(d))
            .attr("fill", color(type));

        svg.append("g")
            .attr("transform", "translate(0, 100)")
            .call(xAxis);

        svg.append("g")
            .call(d3.axisLeft(yScale));
    });
});