// CouponCard.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as Clipboard from "expo-clipboard";

const CouponCard = ({ offer, limit, brandImage, coupon }) => {
  const [copiedText, setCopiedText] = React.useState("");

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(coupon);
  };

  return (
    <View style={styles.outercard}>
      <View style={styles.innercard}>
        <View style={styles.left}>
          <Image source={{ uri: brandImage }} style={styles.image}></Image>
        </View>
        <View style={styles.right}>
          <Text style={styles.offer}>{offer}</Text>
          <Text style={styles.limit}>{limit}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.tag}>Coupon Code: </Text>
            <Text style={styles.coupon}>{coupon}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.tag}>Expiry : </Text>
            <Text style={styles.expiry}>25-08-2024</Text>
          </View>
          <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
            <Text style={styles.copyButtonText}>Copy Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outercard: {
    backgroundColor: "rgba(157,78,221,0.15)",
    height: Dimensions.get("window").height / 5,
    padding: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  innercard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: "auto",
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 25,
    height: "100%",
    alignItems: "center",
    // backgroundColor:'black'
  },

  left: {
    width: "40%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  right: {
    width: "60%",
  },
  image: {
    minWidth: "50%",
    minHeight: "50%",
    maxWidth: "80%",
    maxHeight: "60%",
    borderRadius: 50,
    resizeMode: "contain",
  },
  offer: {
    fontWeight: "bold",
    fontSize: 15,
  },
  limit: {
    fontSize: 13,
    color: "gray",
    paddingBottom: 5,
  },
  coupon: {
    fontWeight: "900",
  },
  expiry: {
    fontWeight: "500",
    fontSize: 13,
  },
  tag: {
    letterSpacing: 1,
    fontSize: 13,
  },
  copyButton: {
    backgroundColor: "rgba(60,9,108,0.3)",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginVertical: 5,
  },
  copyButtonText: {
    fontWeight: "500",
    letterSpacing: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    color: "#3C096C",
    opacity: 1,
    fontSize: 10,
  },
});

export default CouponCard;
