bobbys.sort((a, b) => a.Name.localeCompare(b.Name));

const maxDiff = 10;

function createSlide(bob, index) {
  return `
  <div class="carousel-cell" data-index="${index}" data-id="${bob.Name}">
    <img class="d-block w-100 animatoor carousel-cell-image" data-flickity-lazyload="photos/${bob["Image1"]}.jpg" alt="First slide">

    <div class="footer">
      ${bob.Name} <br />
      <div class="smaller">
        ${bob.Title} <br />
      </div>
    </div>
  </div>
  `;
}

function createSearchItem(bob, index) {
  return `
  <li class="list-group-item search-item" data-index="${index}">${bob.Name}</li>
  `;
}

$(function () {
  $(".main-carousel").append(bobbys.map(createSlide));
  $(".search-group").append(bobbys.map(createSearchItem));

  var $carousel = $(".main-carousel").flickity({
    contain: true,
    wrapAround: true,
    lazyLoad: 1,
    pageDots: false,
    autoPlay: 2700,
    friction: 0.8,
    selectedAttraction: 0.01,
    pauseAutoPlayOnHover: false,
    // fullscreen: true
  });

  $(".carousel-cell").each((i, cell) => {
    cell = $(cell);

    const click = (down ,up) => {
      const diff =
        Math.abs(up.offsetX - down.offsetX) +
        Math.abs(up.offsetY - down.offsetY);

      if (diff < maxDiff) {
        if (cell.hasClass("is-selected")) {
          const bob = bobbys.find((b) => b.Name === cell.attr("data-id"));

          $(".focus-name").text(bob.Name);
          $(".focus-force").text(bob.Force);
          $(".focus-age").text(`Age ${bob.Age}`);
          $(".focus-rank").text(`${bob["Police rank & collar number"]}`);

          if (bob["Military rank & service no"]) {
            $(".focus-military").text(`${bob["Military rank & service no"]}`);
            $(".focus-military").show();
            $(".focus-military-heading").show();
          } else {
            $(".focus-military").hide();
            $(".focus-military-heading").hide();
          }

          if (bob["Regiment / Armed Service"]) {
            $(".focus-regiment").text(`${bob["Regiment / Armed Service"]}`);
            $(".focus-regiment").show();
            $(".focus-regiment-heading").show();
          } else {
            $(".focus-regiment").hide();
            $(".focus-regiment-heading").hide();
          }

          if (bob["Burial/commemorated"]) {
            $(".focus-burial").text(`${bob["Burial/commemorated"]}`);
            $(".focus-burial").show();
            $(".focus-burial-heading").show();
          } else {
            $(".focus-burial").hide();
            $(".focus-burial-heading").hide();
          }

          if (bob["Description"]) {
            $(".focus-notes").text(`${bob["Description"]}`);
            $(".focus-notes").show();
            $(".focus-notes-heading").show();
          } else {
            $(".focus-notes").hide();
            $(".focus-notes-heading").hide();
          }

          $(".focus-died").text(`Died: ${bob["Died"]}`);

          if (bob["Image2"]) {
            const imgs = ["Image2", "Image 3", "Image 4", "Image5"];

            $(".additional-imgs").empty();
            $(".additional-imgs").show();

            for (let img of imgs) {
              if (bob[img]) {
                const ele = $(
                  `<img class="additional-img" src="photos/${bob[img]}.jpg" alt="">`
                );

                $(".additional-imgs").append(ele);

                ele.click((_) => {
                  $(".big-pic-img").attr("src", `photos/${bob[img]}.jpg`);

                  $("#big-pic").modal({
                    fadeDuration: 250,
                    showClose: false,
                  });
                });
              }
            }
          } else {
            $(".additional-imgs").hide();
          }

          $(".mini-profile-img").attr("src", `photos/${bob["Image1"]}.jpg`);

          $("#focus").modal({
            fadeDuration: 250,
            showClose: false,
          });
        } else {
          const index = cell.attr("data-index");
          $carousel.flickity("select", index);
        }
      }
    }

    cell.on('pointerdown', down => {
      console.log('pointerdown')
      cell.on('pointerup', up => {
        click(down, up)
      })
    })
    

    // Mouse is for iOS! :D
    cell.on("mousedown", (down) => {
      console.log('mousedown')
      cell.on("mouseup", up => {
        click(down, up)
      });
    });
  });

  $(".search-item").each((i, e) => {
    const item = $(e);
    const index = item.attr("data-index");

    item.click((_) => {
      $carousel.flickity("stopPlayer");
      $carousel.flickity("select", index);
      $.modal.close();
    });
  });

  $('a[href="#search"]').click(function (event) {
    event.preventDefault();
    $(this).modal({
      fadeDuration: 250,
      showClose: false,
    });
  });

  $('a[href="#info"]').click(function (event) {
    event.preventDefault();
    $(this).modal({
      fadeDuration: 250,
      showClose: false,
    });
  });
});
