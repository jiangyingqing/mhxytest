var mhxy = function () {
  var mhxyActive = {
    dom: {
      activitySwiperSlide: $('.section-gamePlay .content-active #activity-swiper .swiper-slide'),
      gamePlay: $('.section-gamePlay'),
      contentTypeSwiper: $('.section-gamePlay .content #type-swiper .swiper-wrapper'),
      contentTypeSlide: $('.section-gamePlay .content #type-swiper .swiper-wrapper .swiper-slide'),
      contentActive: $('.section-gamePlay .content .content-swiper .activity-swiper .swiper-wrapper'),
      rightNavbarUl: $('.content-navbar ul')
    },
    //初始化
    init: function () {
      var base = this;
      base.initContent()
      base.initRightNav()
      base.initSwiper()
      $('.section-gamePlay .content #type-swiper .swiper-slide').on('click', $.proxy(base.swiperClickChangeActivity, base))
      $('.content-navbar ul .directory1').on('click', $.proxy(base.fristChange, base))
      $('.content-navbar .directory1 .ul-directory2 .directory2').on('click', $.proxy(base.secondChange, base))
    },

    //初始化轮播图
    initSwiper: function () {
      var base = this
      var swiperArray = []
      jsonGit.jsonLeftContent.forEach(item => {
        var mySwiper = new Swiper(`.${item.typeSwiper}`, {
          // loop: false, 
          slidesPerView: "auto",
          normalizeSlideIndex: false,
          on: {
            slideChange: function () {
              var index = this.activeIndex
                , activitySlide = $(this.$el[0]).parents('.content-active').find('#activity-swiper .swiper-slide').eq(index)
              base.showItem(activitySlide)
              $('.content-navbar .directory1 .directory1-container .active').parent().siblings().find('.directory2').eq(index).find('.text').addClass('sel')
              $('.content-navbar .directory1 .directory1-container .active').parent().siblings().find('.directory2').eq(index).siblings().find('.text').removeClass('sel')
            },
            slideChangeTransitionEnd: function () {
              // console.log(this);
              // console.log(this.realIndex);
              // console.log(this.activeIndex,$(this.$el[0]).parents('.content-active').find('#activity-swiper .swiper-slide').length);
              if (this.activeIndex === $(this.$el[0]).parents('.content-active').find('#activity-swiper .swiper-slide').length - 1) {
                $('.swiper-button-next').addClass('swiper-button-disabled')
              }
              else {
                $('.swiper-button-next').removeClass('swiper-button-disabled')
              }
            },
          }
        })


        swiperArray.unshift(mySwiper)
      })

      $('.swiper-button-prev').on('click', function () {
        var index = $(this).parents('.content').index()

        swiperArray.forEach(item => {
          item.slidePrev();
          // console.log(swiperArray[index].activeIndex);
          // if (swiperArray[index].activeIndex === 0) {
          //   $('.swiper-button-prev').removeClass('swiper-button-disabled')
          // } else {
          //   swiperArray[index].slideTo(swiperArray[index].activeIndex - 1)
          // }

        })
      })

      $('.swiper-button-next').on('click', function () {
        var index = $(this).parents('.content').index()
        swiperArray.forEach(item => {
          item.slideNext();
        })
      })


      return swiperArray
    },

    //初始化右导航
    initRightNav: function () {
      var base = this;
      var par = base.dom.rightNavbarUl;
      jsonGit.jsonRightNav.forEach(element => {
        let domLi1 = $(`<li class="item directory1">
        <div class="directory1-container">
        <p class="title">${element.title}</p>
        </div>
        </li >`
        )
        if (element.directory) {
          let domUl = $(`<ul class="ul-directory2"></ul>`)
          element.directory.forEach(liData2 => {
            let domLi2 = $(` 
            <li class="item-play directory2">
                <span class="text">${liData2.title}</span>
            </li>`)
            domUl.append(domLi2)
          })
          domLi1.append(domUl)
        }
        par.append(domLi1)
      });
      $('.content-navbar ul .directory1').eq(2).find('.title').addClass('active');
      $('.content-navbar ul .directory1').eq(2).find('.ul-directory2 .directory2').eq(0).find('.text').addClass('sel');
    },

    //初始化左侧内容页
    initContent: function () {
      var base = this;
      jsonGit.jsonLeftContent.forEach(item => {
        var content = $(`
        <div class="content">
        <div class="content-title">
            <img src=${item.titleUrl}>
            ${item.title}
        </div>
        <div class="content-tags">
        <div class="swiper-container ${item.typeSwiper}" id="type-swiper">
            <div class="swiper-wrapper">
            ${item.contentTag.map(tagsItem => {
          return `<div class="swiper-slide">
                      <img class="common" src=${tagsItem.commonUrl} alt=${tagsItem.imageAlt}>
                      <img class="hover" src=${tagsItem.hoverUrl} alt=${tagsItem.imageAlt}>
                  </div>`
        }).join('')}
            </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <img class="decoration1" src="./image/decoration.png">
        <img class="decoration2" src="./image/decoration.png">
        </div>
        <div class="content-swiper">
          <div id="activity-swiper">
            <div class="swiper-wrapper">
            ${item.contentSwiper.map(swiperItem => {
          return `
                  <div class="swiper-slide">
                    <div class="activity-time title">
                      <img src=${swiperItem.activeTime}>
                    </div>
                    <p class="time">${swiperItem.time}</p>
                    <div class="activity-introduce title">
                      <img src=${swiperItem.activeIntroduce}>
                    </div>
                    <p class="introduce">
                      ${swiperItem.introduce}
                     </p>
                    <div class="activity">
                       <img src=${swiperItem.activityUrl}>
                    </div>
                  </div>`
        }).join('')}
            </div>
          </div>
        </div>
        </div>`)
        base.dom.gamePlay.prepend(content);
        if (item.id === 0) {
          $('.section-gamePlay .content').eq(item.id).find('.content-tags').hide();
        }
      })
      $('.section-gamePlay .content').eq(1).addClass('content-active')
      $('.section-gamePlay .content-active').find('#activity-swiper .swiper-slide').eq(0).addClass('active')
    },

    //轮播点击切换活动内容
    swiperClickChangeActivity: function (e) {
      var base = this
        , item = e.currentTarget
        , index = $(item).index()
        , activitySlide = $(item).parents('.content-active').find('#activity-swiper .swiper-slide').eq(index)
        , ContentIndex = ($(item).parents('.content'))
        , drirectory2Select = $('.content-navbar ul .directory1').eq($(ContentIndex).index() + 1).find(".ul-directory2 .directory2").eq(index)
        , mySwiper = base.initSwiper()

      mySwiper[ContentIndex.index()].slideTo(index)
      drirectory2Select.find('.text').addClass('sel')
      drirectory2Select.siblings().find('.text').removeClass('sel')
      base.showItem(activitySlide)
      $(item).addClass('swiper-slide-active').siblings().removeClass('swiper-slide-active');
    },

    // //一级标题切换
    fristChange: function (e) {
      var item = e.currentTarget
        , index = $(item).index()
        , content = $('.section-gamePlay .content')
      if (index === 0)
        alert('已跳转首页')
      else {
        $(item).find('.directory1-container .title').addClass('active')
        $(item).siblings().find('.directory1-container .title').removeClass('active')
        $(item).siblings().find('.directory2 .text').removeClass('sel')
        content.eq(index - 1).addClass('content-active').siblings().removeClass('content-active')
        $('.section-gamePlay .content-active').find('#activity-swiper .swiper-slide').eq(0).addClass('active')
      }
      this.initSwiper()
    },

    // //二级标题切换
    secondChange: function (e) {
      e.stopPropagation()
      var base = this
        , item = e.currentTarget
        , index = $(item).index()
        , mySwiper = base.initSwiper()
        , parIndex = $(item).parents('.directory1').index()
      $('.directory2 .text').removeClass('sel')
      $(item).find('.text').addClass('sel')
      $(item).siblings().find('.text').removeClass('sel')
      $(item).parents('.directory1')[0].click()
      mySwiper[parIndex - 1].slideTo(index)
    },

    showItem: function (item) {
      item.addClass('active').siblings().removeClass('active');
    }
  }
  mhxyActive.init()
}()