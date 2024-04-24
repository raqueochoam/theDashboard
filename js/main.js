document.addEventListener("DOMContentLoaded", function() {
    // Obtener el elemento donde se mostrarán los textos centrados
    var chartArea = d3.select("#chart-area");

    // Obtener los datos del JSON
    var jsonData = [
        {
            "production": 17,
            "rejections": 2,
            "rejection_percentage": 11.76,
            "delay_due_to_bottleneck": 487.38,
            "accidents": 1,
            "occupancy_per_workstation": [
                18,
                17,
                17,
                17,
                17,
                17
            ],
            "downtime_per_workstation": [
                22.52,
                0,
                8.759999999999998,
                1.5,
                0,
                0.8899999999999999
            ],
            "idle_time_per_workstation": [
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "waiting_time_per_workstation": [
                163.71789880389207,
                217.47039653389672,
                287.7736830467296,
                350.2902452495745,
                417.71097551250875,
                487.3864236635659
            ]
        }
    ];

    // Obtener los datos de occupancy_per_workstation del JSON
    var occupancyData = jsonData[0].occupancy_per_workstation;
    var downtimeData = jsonData[0].downtime_per_workstation;
    var idleTimeData = jsonData[0].idle_time_per_workstation;
    var waitingTimeData = jsonData[0].waiting_time_per_workstation;

    // Agregar los textos al elemento chart-area
    chartArea.append("p").text("Production: " + jsonData[0].production);
    chartArea.append("p").text("Rejections: " + jsonData[0].rejections);
    chartArea.append("p").text("Rejection Percentage: " + jsonData[0].rejection_percentage + "%");
    chartArea.append("p").text("Delay Due to Bottleneck: " + jsonData[0].delay_due_to_bottleneck);
    chartArea.append("p").text("Accidents: " + jsonData[0].accidents);

    // Crear SVG para el gráfico de ocupación
    var occupancyArea = d3.select("#graph-occupancy-area").append("svg")
        .attr("width", 400)
        .attr("height", 400);

    // Crear rectángulos para el gráfico de ocupación
    var rectangles = occupancyArea.selectAll("rect")
        .data(occupancyData);

    rectangles.enter()
        .append("rect")
            .attr("x", (d, i) => i * 50 + 25)
            .attr("y", (d, i) => 100)
            .attr("width", (d) => d)
            .attr("height", (d) => d * 3)
            .attr("fill", "pink");

    // Crear SVG para el gráfico de downtime
    var downtimeArea = d3.select("#graph-downtime-area").append("svg")
        .attr("width", 400)
        .attr("height", 400);

    // Crear rectángulos para el gráfico de downtime
    rectangles = downtimeArea.selectAll("rect")
        .data(downtimeData);

    rectangles.enter()
        .append("rect")
            .attr("x", (d, i) => i * 50 + 25)
            .attr("y", (d, i) => 100)
            .attr("width", (d) => d)
            .attr("height", (d) => d * 3)
            .attr("fill", "lightblue");

    // Crear SVG para el gráfico de idle time
    var idleTimeArea = d3.select("#graph-idle-time-area").append("svg")
        .attr("width", 400)
        .attr("height", 400);

    // Crear rectángulos para el gráfico de idle time
    rectangles = idleTimeArea.selectAll("rect")
        .data(idleTimeData);

    rectangles.enter()
        .append("rect")
            .attr("x", (d, i) => i * 50 + 25)
            .attr("y", (d, i) => 100)
            .attr("width", (d) => d)
            .attr("height", (d) => d * 3)
            .attr("fill", "lightgreen");

    // Crear SVG para el gráfico de waiting time
    var waitingTimeArea = d3.select("#graph-waiting-time-area").append("svg")
        .attr("width", 400)
        .attr("height", 400);

    // Crear rectángulos para el gráfico de waiting time
    rectangles = waitingTimeArea.selectAll("rect")
        .data(waitingTimeData);

    rectangles.enter()
        .append("rect")
            .attr("x", (d, i) => i * 50 + 25)
            .attr("y", (d, i) => 100)
            .attr("width", (d) => d)
            .attr("height", (d) => d * 3)
            .attr("fill", "lightcoral");
});
