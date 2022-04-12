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
  var tooltipShow = config.tooltipShow;
  var legendShow = config.legendShow;
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

  var color = d3.scaleOrdinal().range(
    d3.schemeCategory10.map(function (c) {
      c = d3.rgb(c);
      c.opacity = 0.8;
      return c;
    })
  );

  var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("border-radius", "10px");

  var myColor = d3
    .scaleSequential()
    .domain([1, 10])
    .interpolator(d3.interpolateViridis);

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
  if (!titleConfig.titleShow) {
    titleGroup
      .append("text")
      .attr("id", "title")
      .attr("fill", titleConfig.titleColor)
      .style("font-weight", "bold")
      // .text(titleConfig.title)
      .text("Title")
      .style("font-size", titleConfig.fontSize + "px")
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
      .style("font-size", ".8em")
      .text(titleConfig.subtitle);
  }

  var tree = svg
    .append("g")
    .attr("id", "treemap-diagram")
    .attr(
      "transform",
      "translate(" + svgProps.margin.left + ", " + svgProps.margin.top + ")"
    );

  // var chartLayer = svg.append("g").classed("chartLayer", true);

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

    var treemap = d3
      .treemap()
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
        .each(function (d) {
          if (d.depth === 1) {
            d3.select(this).select("text").remove();
          }
        })
        .attr("class", "leaf")
        .attr("transform", function (d) {
          return "translate(" + d.x0 + "," + d.y0 + ")";
        })
        .each(function (d) {
          const dep = d.depth;
          if (d.depth === 0) {
            d3.select(this)
              .style("fill", "white")
              // .style("stroke", "black")
              // .style("stroke-width", "1px")
              .attr("width", d.x1 - d.x0 + 10)
              .attr("height", d.y1 - d.y0 + 10)
              .attr("transform", "translate(-5, -5)");
          }
          if (dep === 1) {
            d3.select(this).attr("class", "parent").style("fill", "white");
          }
          if (dep === 2) {
            d3.select(this).attr("rx", 2).attr("ry", 2).style("opacity", 1);
            // .attr("y", 1);
          }
        });

      const leaf = leaves
        .selectAll("g")
        .data(function (d) {
          return d.children;
        })
        .enter()
        .append("g")
        .attr("class", "leaf2")
        .attr("transform", function (d) {
          return "translate(" + d.x0 + "," + d.y0 + ")";
        });

      leaf
        .append("rect")
        .attr("class", "tile")
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", function (d) {
          while (d.depth > 1) d = d.parent;
          return color(d.id);
        });

      var parentNode = d3.selectAll(".parent");
      parentNode
        .attr("width", function (d) {
          return d.x1 - d.x0 + 10;
        })
        .attr("height", function (d) {
          return d.y1 - d.y0 + 10;
        })
        .attr("transform", function (d) {
          return "translate(-5, -5)";
        });
      leaf
        .append("text")
        .text((d) => d.data.id.substring(d.data.id.lastIndexOf(".") + 1))
        .style("font-size", ".7em")
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
          .attr("fill", (d) => color(d));

        // Add text showing category types
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
      svg.selectAll(".tile").on("mouseover", mouseover);
      svg.selectAll(".tile").on("mousemove", mousemove);
      svg.selectAll(".tile").on("mouseout", mouseout);
      // mouse events on rect
      // on mouseover function
      function mouseover(d) {
        const thisNode = d3.select(this).selectAll(".tile");
        thisNode.style("opacity", 1);
        console.log(thisNode);
        if (!tooltipShow) {
          showTooltip(d);
        }
      }

      // on mousemove function
      function mousemove() {
        tooltip
          .style("top", d3.event.pageY - 70 + "px")
          .style("left", d3.event.pageX + 20 + "px");
      }

      // on mouseout function
      function mouseout(d) {
        const thisNode = d3.select(this).select("rect");

        tooltip.transition().duration(200).style("opacity", 0);
        tooltip.selectAll("*").remove();
        thisNode.style("opacity", function (d) {
          while (d.depth > 1) d = d.parent;
          return 1;
        });
      }

      // create tooltip card
      function createCard(d) {
        var card = tooltip.append("div").attr("class", "card");
        card
          .append("div")
          .attr("class", "card-header text-white p-2")
          .style("background-color", () => {
            while (d.depth > 1) d = d.parent;
            return color(d.id);
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

      // tooltip function
      function showTooltip(d) {
        tooltip.transition().duration(200).style("opacity", 1);
        createCard(d);
      }
    }
  }
}
