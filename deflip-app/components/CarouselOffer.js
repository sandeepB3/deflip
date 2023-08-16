import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Carousel from "react-native-reanimated-carousel";


// try different carousel types : Parallex Layers later on

export default function CarouselOffer() {

  const width = Dimensions.get("window").width - 38;
  const data = [
      {
          image: require("../assets/banner/banner.jpg")
      },
      {
        image: require("../assets/banner/banner2.jpg")
      },
  ]

  return <>
    <View style={{ flex: 1, marginTop: 20, display:'flex',
        alignItems:'center',}}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={data}
                scrollAnimationDuration={5000}
                style={{
                    borderRadius: 10,
                    marginBottom:30
                }}
                renderItem={({ value, index }) => (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            paddingHorizontal:5
                        }}
                    >
                        <Image source={data[index].image} style={styles.image} />
                    </View>
                )}
            />
        </ View >
  </>
}


const styles = StyleSheet.create({
  image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover", 
      borderRadius:25   
  }
});