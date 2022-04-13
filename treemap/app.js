window.onload = () => {
  base_first_time({
    _col_rel: { id: "id", value1: "value1", value2: "value2" },
    _config: {
      "chart.title.color": "#111",
    },
    _data: [
      {
        id: "idValue",
        value1: "",
      },
      {
        id: "idValue.val1",
        value1: "",
      },
      {
        id: "idValue.val1.val-2",
        value1: 100,
        value2: 2000,
      },
      {
        id: "idValue.val1.val-3",
        value1: 200,
        value2: 1000,
      },
      {
        id: "idValue.val1.val-4",
        value1: 130,
        value2: 3000,
      },
      {
        id: "idValue.val1.val-10",
        value1: 200,
        value2: 1000,
      },
      {
        id: "idValue.val1.val-4",
        value1: 130,
        value2: 3000,
      },
      {
        id: "idValue.val2",
        value1: "",
        value2: "",
      },
      {
        id: "idValue.val2.val-5",
        value1: 140,
        value2: 3200,
      },
      {
        id: "idValue.val2.val-2",
        value1: 100,
        value2: 3100,
      },
      {
        id: "idValue.val2.val-6",
        value1: 210,
        value2: 2400,
      },
      {
        id: "idValue.val3",
        value1: "",
        value2: "",
      },
      {
        id: "idValue.val3.val-7",
        value1: 120,
        value2: 2500,
      },
      {
        id: "idValue.val3.val-9",
        value1: 220,
        value2: 1000,
      },
      {
        id: "idValue.val3.val-15",
        value1: 290,
        value2: 1000,
      },
      {
        id: "idValue.val4",
        value1: "",
        value2: "",
      },
      {
        id: "idValue.val4.val-9",
        value1: 300,
        value2: 2000,
      },
      {
        id: "idValue.val4.val-9",
        value1: 250,
        value2: 1200,
      },
      {
        id: "idValue.val4.val-12",
        value1: 220,
        value2: 1500,
      },
      {
        id: "idValue.val4.final",
        value1: 200,
        value2: 800,
      },
      {
        id: "idValue.val4.final1",
        value1: 210,
        value2: 1850,
      },
      {
        id: "idValue.val4.f",
        value1: 210,
        value2: 1950,
      },
    ],
  });
};

const transformData = async (newData) => {
  return newData;
};

const init_handler = () => {
  console.log("init_handler", {
    width,
    height,
    col_rel,
    config,
    old_config,
    data,
  });
  app(data, config);
};

const change_config_handler = () => {
  console.log("change_config_handler", {
    width,
    height,
    col_rel,
    config,
    old_config,
    data,
  });
  app(data, config);
};

const resizeHandler = () => {
  console.log("resizeHandler", { width, height });
  app(data, config);
};

function app(data, config) {
  var transitioning;
  var tooltipShow = config.tooltipShow;
  var legendShow = config.legendShow;
  var paletteName = "brown";
  // title settings
  const titleConfig = {
    titleShow: config?.title?.show,
    title: config?.title?.text,
    fontSize: config?.title?.fontSize,
    titleColor: config?.title?.color,
    titleBackgroundColor: config?.title?.backgroundColor,
    titleFontWeight: config?.title?.fontWeight,
    subtitleShow: config?.subtitle?.show,
    subtitle: config?.subtitle?.text,
    subtitleColor: config?.subtitle?.color,
  };

  const svgProps = {};
  svgProps.outerWidth = 900;
  svgProps.outerHeight = svgProps.outerWidth / 1.8; // 16:10 aspect ratio
  svgProps.margin = {
    top: svgProps.outerHeight * 0.1,
    right: svgProps.outerWidth * 0.03,
    bottom: svgProps.outerHeight * 0.08,
    left: svgProps.outerWidth * 0.03,
  };
  svgProps.innerWidth =
    svgProps.outerWidth - svgProps.margin.left - svgProps.margin.right;
  svgProps.innerHeight =
    svgProps.outerHeight - svgProps.margin.top - svgProps.margin.bottom;
  svgProps.title = {
    x: svgProps.outerWidth / 2,
    y: svgProps.margin.top / 2,
  };

  svgProps.legend = {
    x: svgProps.margin.left,
    y: svgProps.outerHeight - svgProps.margin.bottom / 1.5,
    itemWidth: 100,
    squareSize: 15,
  };

  const margin = { top: 40, right: 10, bottom: 10, left: 10 };
  var width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  /**
   * Custom design settings
   * @designer Ehsan Ezzati
   * @author Ehsan Ghaffar
   */

  // fonts and typography
  var typography = {
    fontFamily: "Plus Jakarta Sans",
    titleFontSize: "18px",
    subtitleFontSize: "16px",
    legendFontSize: "14px",
    textFontSize: "14px",
    tooltipFontSize: "14px",
    axisFontSize: "12px",
  };

  const colorList = {
    // Monochrome with tints Colors
    monochrome: [
      "#0061F7",
      "#1973FF",
      "#3A87FF",
      "#5B9BFF",
      "#7CAFFF",
      "#9CC3FF",
      "#BDD7FF",
      "#DEEBFF",
    ],
    // soft pastel colors
    softPastel: [
      "#516B91",
      "#59C4E6",
      "#EDAFDA",
      "#93B7E3",
      "#A5E7F0",
      "#CBB0E3",
      "#D6E3B0",
      "#E3B0B0",
    ],
    // Special bold colors
    specialBold: [
      "#C12E34",
      "#E6B600",
      "#0098D9",
      "#2B821D",
      "#005EAA",
      "#339CA8",
      "#CDA819",
      "#32A487",
    ],
    // Dim light palette
    dimLight: [
      "#2EC7C9",
      "#B6A2DE",
      "#5AB1EF",
      "#FFB980",
      "#D87A80",
      "#8D98B3",
      "#E5CF0D",
      "#97B552",
    ],
    // Brown colors
    brown: [
      "#D87C7C",
      "#919E8B",
      "#D7AB82",
      "#6E7074",
      "#61A0A8",
      "#EFA18D",
      "#787464",
      "#CC7E63",
    ],
  };

  // choose color palette
  function getColor(colorName) {
    return colorList[colorName];
  }
  var colorPalette = getColor(paletteName);

  // Soft Pastel color scale
  var softPastelScheme = d3.scaleOrdinal().range(
    colorPalette.map(function (c) {
      c = d3.rgb(c);
      c.opacity = 0.8;
      return c;
    })
  );

  /* create x and y scales */
  var x = d3.scaleLinear().domain([0, width]).range([0, width]);

  var y = d3.scaleLinear().domain([0, height]).range([0, height]);

  var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("border-radius", "10px");

  d3.select("#svg-container").selectAll("svg").remove();

  const svg = d3
    .select("main div#svg-container")
    .append("svg")
    .attr("width", svgProps.outerWidth)
    .attr("height", svgProps.outerHeight);
  /** svg title text */
  const titleGroup = svg
    .append("g")
    .attr("id", "title-group")
    .attr(
      "transform",
      "translate(" + svgProps.title.x + ", " + svgProps.title.y + ")"
    )
    .style("text-anchor", "middle");
  if (titleConfig.titleShow) {
    titleGroup
      .append("text")
      .attr("id", "title")
      .attr("fill", titleConfig.titleColor)
      .style("font-weight", "bold")
      .text(titleConfig.title)
      .style("font-family", typography.fontFamily)
      .style("font-size", typography.titleFontSize)
      .style("background-color", titleConfig.titleBackgroundColor)
      .style("font-weight", titleConfig.titleFontWeight);
  }
  if (titleConfig.subtitleShow) {
    titleGroup
      .append("text")
      .attr("id", "description")
      .attr("dy", "1.25em")
      .attr("fill", titleConfig.subtitleColor)
      .style("font-weight", "normal")
      .style("font-size", typography.subtitleFontSize)
      .text(titleConfig.subtitle);
  }

  var tree = svg
    .append("g")
    .attr("id", "treemap-diagram")
    .attr(
      "transform",
      "translate(" + svgProps.margin.left + ", " + svgProps.margin.top + ")"
    );

  main(data);
  cast(data);

  function cast(d) {
    d.value1 = +d.value1;
    d.value2 = +d.value2;
    return d;
  }

  function main(data) {
    // setSize();

    var stratify = d3.stratify().parentId(function (d) {
      if (d.id.indexOf(".") > -1) {
        return d.id.substring(0, d.id.lastIndexOf("."));
      } else {
        let id = "";
        return id;
      }
    });

    var root1 = stratify(data).sum(function (d) {
      return d.value1;
    });

    // Initialize the Treemap
    var treemap = d3
      .treemap()
      .tile(d3.treemapSquarify)
      .size([svgProps.innerWidth, svgProps.innerHeight])
      .padding(1)
      .round(true);

    treemap(root1);
    drawChart(root1);

    function drawChart(root) {
      const allRoot = root.descendants();

      const leaves = tree
        .selectAll("g")
        .data(allRoot.filter((d) => d.depth === 1))
        .enter()
        .append("g")
        .attr("class", "parent");

      // group data by parent
      var parentNode = d3.select("svg").selectAll(".parent");
      parentNode
        .attr("width", function (d) {
          return d.x1 - d.x0 + 10;
        })
        .attr("height", function (d) {
          return d.y1 - d.y0 + 10;
        });

      // var chartLayer = svg.append("g").classed("chartLayer", true);
      const leaf = leaves
        .selectAll("g")
        .data(function (d) {
          return d.children;
        })
        .enter()
        .append("g")
        .attr("class", "leaf")
        .attr("transform", function (d) {
          return "translate(" + d.x0 + "," + d.y0 + ")";
        });
      leaf
        .append("rect")
        .attr("class", "tile")
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .style("stroke", "none")
        .attr("fill", function (d) {
          while (d.depth > 1) d = d.parent;
          return d3.rgb(softPastelScheme(d.data.id)).brighter(0.5);
        });

      leaf
        .append("text")
        .text((d) => d.data.id.substring(d.data.id.lastIndexOf(".") + 1))
        .style("font-size", ".7em")
        .style("fill", "black")
        .style("stroke", "none")
        .each(function (d) {
          let w = d.x1 - d.x0;
          let h = d.y1 - d.y0;
          let wrap = d3
            .textwrap()
            .bounds({ height: h, width: w })
            .padding(20)
            .method("tspans");
          d3.select(this).call(wrap);
        });

      // legend config
      const legend = svg.append("g").attr("id", "legend");
      if (legendShow) {
        legend
          .selectAll("g")
          .data(root.children.map((d) => d.id))
          .enter()
          .append("g")
          .attr("class", "legend-item-group")
          .attr("transform", (d, i) => {
            let x = i * svgProps.legend.itemWidth,
              y = 0;
            return "translate(" + x + ", " + y + ")";
          });
        legend
          .selectAll("g.legend-item-group")
          .append("rect")
          .attr("class", "legend-item")
          .attr("x", 0)
          .attr("y", 0)
          .attr("height", svgProps.legend.squareSize)
          .attr("width", svgProps.legend.squareSize)
          .attr("fill", (d) => softPastelScheme(d));

        // Add text to legend
        legend
          .selectAll("g.legend-item-group")
          .append("text")
          .attr("class", "legend-item-text")
          .attr("x", svgProps.legend.squareSize + 4)
          .attr("y", "1em")
          .style("font-size", ".8em")
          .text((d) => d);

        // Position legend
        legend.attr("transform", () => {
          let legendW = legend.node().getBBox().width,
            legendX =
              (svgProps.innerWidth - legendW) / 2 + svgProps.margin.left;
          return "translate(" + legendX + ", " + svgProps.legend.y + ")";
        });
      }

      // Event listeners
      svg.selectAll(".tile").on("mouseover", mouseover);
      svg.selectAll(".tile").on("mousemove", mousemove);
      svg.selectAll(".tile").on("mouseout", mouseout);

      function mouseover(d) {
        const thisNode = d3.select(this);
        const thisParent = thisNode.node().parentNode;
        const thisParentNode = d3.select(thisParent);
        const thisParentParent = thisParentNode.node().parentNode;
        const thisParentParentNode = d3.select(thisParentParent);
        thisNode.style("fill", function (d) {
          return d3.rgb(d3.select(this).style("fill")).brighter(1);
        });
        thisParentParentNode
          .append("rect")
          .attr("class", "overlay")
          .attr("width", function (d) {
            return d.x1 - d.x0;
          })
          .attr("height", function (d) {
            return d.y1 - d.y0;
          })
          .attr("x", function (d) {
            return d.x0;
          })
          .attr("y", function (d) {
            return d.y0;
          })
          .style("fill", "none")
          .attr("stroke", function (d) {
            return softPastelScheme(d.data.id).darker(1);
          })
          .attr("stroke-width", "2px")
          .attr("rx", "2px")
          .attr("ry", "2px");
        if (!tooltipShow) {
          showTooltip(d);
        }
        // thisParentNode.selectAll("text").call(text).style("stroke", "none");
      }

      function mousemove() {
        tooltip
          .style("top", d3.event.pageY - 70 + "px")
          .style("left", d3.event.pageX + 40 + "px");
      }

      function mouseout(d) {
        const thisNode = d3.select(this);
        tooltip.transition().duration(200).style("opacity", 0);
        tooltip.selectAll("*").remove();
        const thisParent = thisNode.node().parentNode;
        const thisParentNode = d3.select(thisParent);
        const thisParentParent = thisParentNode.node().parentNode;
        const thisParentParentNode = d3.select(thisParentParent);
        thisParentParentNode.selectAll(".overlay").remove();
        thisNode.style("fill", function (d) {
          return;
        });
      }

      // create tooltip content function
      function createCard(d) {
        var card = tooltip.append("div").attr("class", "card");
        card
          .append("div")
          .attr("class", "card-header text-white p-2")
          .style("background-color", () => {
            while (d.depth > 1) d = d.parent;
            return softPastelScheme(d.id);
          })
          .text(`Title:${d.data.id}`)
          .style("font-size", ".9em");
        card.append("div").attr("class", "card-body");
        card
          .select(".card-body")
          .append("p")
          .attr("class", "card-text")
          .style("font-size", "0.8em")
          .text(`Value 1: ${d.data.value1}`);
        card
          .select(".card-body")
          .append("p")
          .style("font-size", "0.8em")
          .attr("class", "card-text")
          .text(`Value 2: ${d.data.value2}`);
      }

      function showTooltip(d) {
        tooltip.transition().duration(200).style("opacity", 1);
        createCard(d);
      }
    }
  }
}
