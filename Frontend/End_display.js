import { LocaleProvider } from "antd-mobile-rn";
import enUS from 'antd-mobile-rn/lib/locale-provider/en_US';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, WhiteSpace } from 'antd-mobile-rn';
console.disableYellowBox = true;

//Backup in case server dies
let data = [ { day: 'Tuesday',
    date: 'November 27',
    desc: 'Food and Cooking Demos',
    place_time: '12-2pm MLK Student Union' },
  { day: 'Tuesday',
    date: 'November 27',
    desc: 'Food and Cooking Demos',
    place_time: '3-5pm RSF' },
  { day: 'Tuesday',
    date: 'November 27',
    desc: 'LGBTQTalk',
    place_time: '4-6pm 150 Chavez' },
  { day: 'Wednesday',
    date: 'November 28',
    desc: 'Drop-in Nutrition Education',
    place_time: '2:30-4:30pm Tang 2280' },
  { day: 'Thursday',
    date: 'November 29',
    desc: 'LGBTQTalk',
    place_time: '10:30am-12pm 150 Chavez' },
  { day: 'Friday',
    date: 'November 30',
    desc: 'Free Rapid HIV Testing',
    place_time: '(plus SHEP Sexpert Education Clinic ) 4-7pm RSF (special location change)' },
  { day: 'Saturday',
    date: 'December 1',
    desc: 'World Aids Day',
    place_time: '' }];


export default class End_display extends React.Component {

  constructor() {
    super();
    this.state = {
      result: null,
      disp: 1,
      events: null,
    };
  }

  fetchEvents = async () => {
    const url = 'https://uhs-webscraper.herokuapp.com/getCalendar';
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await data.json();
    
    this.setState({events: json, disp: 0});
    console.log("Async finished!");
    }

  render_events = (data) => {
      const data_list = data.map(event => 
        (<View key= { event.date + event.place_time }> 
        <Text style = {{fontSize:20, fontWeight: 'bold', marginTop:10, marginBottom:10, marginLeft:10}}>{event.date}</Text>
        <Card full>
        <Card.Header
          title={event.desc}
          extra={event.day}
        />
        <Card.Body>
          <View style={{ height: 15}}>
            <Text style={{marginLeft: 16, marginRight: 16 }} numberOfLines={5}>{event.place_time}</Text>
          </View>
        </Card.Body> 
        </Card>
      </View>)
      );
      
      return (
        <ScrollView>
        <LocaleProvider locale={enUS}>
        <View style={{ paddingTop: 30 }}>
        <Text style= {{ fontSize: 40, textAlign: 'center', fontWeight: 'bold'}}>UHS Calendar</Text>
          <WhiteSpace size="lg" />
          <View>
        </View>
          { data_list };
        </View>
        </LocaleProvider>
        </ScrollView> 
      );
    }

  render() {
    if (this.state.disp === 1){
      this.fetchEvents();
      console.log("Events fetching async");
    }
    console.log("Display state", this.state.disp);
    if (this.state.disp === 0){
      return(
        <View>
          {this.render_events(this.state.events)}
        </View>
      )}
    else
      return(
        <View>
          {this.render_events(data)}
        </View>
      );
  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
    height: "100%"
  },
  box: {
    width: 250
  },
  date:{
    width: 300
  },
  list:{
    height: 50  
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});