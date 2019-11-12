$(function () {
    var picture = './imges/'

    var weatherIcons = {
        yun: {
            title: '多云',
            icon: 'yun.png'
        },
        qing: {
            title: '晴',
            icon: 'qing.png'
        },
        lei: {
            title: '雷阵雨',
            icon: 'lei.png'
        },
        yu: {
            title: '小雨',
            icon: 'xiao.png'
        },
        zhen:{
            title:'阵雨',
            icon:'zhen.png'
        },
        default: {
            title: '未知',
            icon: ''
        }
    }

    function getWeather(city) {
        var data = {
            appid: '86416435',
            appsecret: 'GTcXxtb7',
            version: 'v6',
        }

        if (city !== undefined) {
            data.city = city
        }

        $.ajax({
            type: 'GET',
            url: 'https://www.tianqiapi.com/api',
            data: data,
            dataType: 'jsonp',
            success: function (data) {
                console.log(data)
                $('.header-nav-left-text').text(data.city)

                var weatherData = ['date', 'week', 'tem', 'wea', 'air_level', 'win', 'win_speed', 'wea_img']

                for (var i = 0; i < weatherData.length; i++) {
                    if (weatherData[i] == 'wea') {
                        $('.' + weatherData[i]).css({
                            backgroundImage: 'url(' + picture + (weatherIcons[data.wea_img] == undefined ?
                                weatherIcons.default : weatherIcons[data.wea_img]).icon + ')'
                        })
                    } else {
                        $('.' + weatherData[i]).text(weatherData[i] === 'tem' ? data[weatherData[i]] +
                            '℃' : data[weatherData[i]])
                    }
                }

                var params = {
                    appid: '86416435',
                    appsecret: 'GTcXxtb7',
                    version: 'v9'
                }

                if (city !== undefined) {
                    params.city = city
                }

                $.ajax({
                    type: 'GET',
                    url: 'https://www.tianqiapi.com/api',
                    data: params,
                    dataType: 'jsonp',
                    success: function (result) {
                        console.log('result==>', result)
                        var hoursWeatherData = result.data[0].hours
                        $.each(hoursWeatherData, function (i, v) {

                            console.log('v==>', v)

                            var $li = $(`<li>
                            <div class="li-wendu tem">${v.tem}℃</div>
                            <div class="li-day date">${v.hours}</div>
                            <div class="li-icon wea_img" style="background-image:url('${picture + (weatherIcons[v.wea_img] == undefined ? weatherIcons.default : weatherIcons[v.wea_img]).icon}')"></div>
                        </li>`)
                            console.log(v.wea_img)
                            // console.log(v.date)
                            $('.hours').append($li)
                        })

                        var futureWeatherData = result.data.slice(1)

                        $.each(futureWeatherData, function (i, v) {
                            var $li = $(` <li>
                            <div class="fl day date">${v.date}</div>
                            <div class="day-icon fl wea_img" style="background-image:url('${picture + (weatherIcons[v.wea_img] == undefined ? weatherIcons.default : weatherIcons[v.wea_img]).icon}')"></div>
                            <div class="day-status fr win">${v.win[1]}</div>
                        </li>`)

                            $('.box-sever').append($li)
                        })
                    }
                })
            }
        })
    }
    getWeather()

    $('.header-nav-righ-search').click(function () {
        var city = $('.header-nav-right-inp').val()

        if (city == undefined || city.trim() == '') {
            return
        }

        $('.hours,.box-sever').empty()

        getWeather(city)
    })
})