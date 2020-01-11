var React = require('react');
var WheaterForm = require('WeatherForm')
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');

var Weather = React.createClass({
    getInitialState:function(){
        return {
            isLoading: false
        }
        // return {
        //     location:'Miami',
        //     temp:88
        // }
    }
    ,handSearch:function(location){
        var that = this;

        that.setState({isLoading:true});

        openWeatherMap.getTemp(location).then(function (temp) {
            that.setState({
                location:location,
                temp:temp,
                isLoading: false
            })
        },function(erroMesssage) {
            that.setState({isLoading:false});
            alert(erroMesssage);
        });
    
    //    this.setState({
    //        location:location,
    //        temp:23
    //    });
    },
    render:function(){

        var {isLoading,temp,location} = this.state;

        function renderMessage(){
            debugger;
            if(isLoading){
                return <h3>Fetching Data...</h3>
            }else if(temp && location){
                return <WeatherMessage temp={temp} location={location} />;
            }
        }

        return (
           
            <div>
                <h3>Weather Component</h3>
                <WheaterForm onSearch={this.handSearch} />                
                {renderMessage()}
            </div>
        )
    }
})

module.exports = Weather;