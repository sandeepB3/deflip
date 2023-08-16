import {
    Button,
    Text,
    Alert,
    Animated,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    View,
    Dimensions,
    Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CarouselOffer from "../components/CarouselOffer";
import Categories from "../components/Categories";
import GlobalBrands from "../components/GlobalBrands";
import BrandDeals from "../components/BrandDeals";
import Searchbar from "../components/Searchbar";




const HomeScreen = ({ navigation }) => {
    return (

        <View style={styles.container}>
             <View style={styles.body}>

                    <ScrollView 
                      vertical={true}  
                      contentContainerStyle={{width: Dimensions.get('window').width,
                    }}>

                        <Searchbar/>
                        

                        <Text style={styles.headings}>Shop By Category</Text>
                        <Categories/>
    
                        <CarouselOffer/>

                        <Text style={styles.headings}>Global Brand Deals</Text>
                        <GlobalBrands/>
                        
                        <Text style={styles.headings}>Unbeatable Brand Deals</Text>
                        <BrandDeals/>
                    
                    </ScrollView>
                
            </View>

        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        width:'100%',
        
    },
    body: {
        paddingBottom: 20,
        width:'100%'
    },
    headings:{
        letterSpacing:2,
        fontSize : 20,
        fontWeight:"500",
        paddingBottom:5,
        paddingHorizontal:30
    }
})













                        {/* <Searchbar/>
                     
                        <CarouselOffer />
                    
                        <Image source={require("../assets/headings/shopByCategory.webp")} style={styles.categories} />

                        <Categories  onPressCategory={(categoryId) => console.log("Category ID:", categoryId)} />
                      
                        <Image source={require("../assets/headings/grandGlobalBrand.webp")} style={styles.categories} />
                      
                        <GlobalBrands/>

                        <Image source={require("../assets/headings/unbeatableBrandDeal.webp")} style={styles.categories} />
                        
                        <BrandDeals/> */}