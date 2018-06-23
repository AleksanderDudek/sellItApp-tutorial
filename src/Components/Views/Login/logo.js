import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';



class Logo extends Component {

    //animations are held in state,
    //this values, declarations are like 
    //start defaults
    state = {
        sellAnim: new Animated.Value(0),
        itAnim: new Animated.Value(0)
    }

    componentWillMount(){
        //sequence runs animations in appearance order
        Animated.sequence([
            //timing sets time for animation
            Animated.timing(this.state.sellAnim,{
                toValue:1,
                duration:1000,
                easing:Easing.easeOutCubic
            }),
            Animated.timing(this.state.itAnim,{
                toValue:1,
                duration:500,
                easing:Easing.easeOutCubic
            })
        ]).start(()=>{
            alert("Done")
        })
    }

    render(){

        console.log(this.props.orientation)
        return(
            <View>
                <View style={
                    
                    this.props.orientation === "portrait"
                    ? styles.logoStylesPortrait 
                    : styles.logoStylesLandscape
                    }>
                   {/* container for animated elements */}
                    <Animated.View
                        style={{
                            opacity: this.state.sellAnim,
                            top: this.state.sellAnim.interpolate({
                                // basicly starting and ending position
                                inputRange:[0,1],
                                outputRange:[100,0]
                            })
                        }}
                    >
                        <Text style={styles.sell}>Sell</Text>
                    </Animated.View>
                    <Animated.View
                        style={{
                            opacity: this.state.itAnim
                            }}
                    >
                        <Text style={styles.it}>It</Text>
                    </Animated.View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logoStylesPortrait:{
      marginTop:50,
      flex: 1,
      flexDirection: 'row',
      maxHeight: 100  
    }, 
    logoStylesLandscape:{
        marginTop:20,
        flex: 1,
        flexDirection: 'row',
        maxHeight: 100  
      }, 
    sell:{
      fontSize: 40,
      fontFamily: 'RobotoCondensed-Regular',
      color: '#555555'
    },
    it:{
      fontSize: 40,
      fontFamily: 'RobotoCondensed-Regular',
      color: '#00ADA9'
    }
  });

export default Logo;