import { StyleSheet } from "react-native";

const styles: any = StyleSheet.create({
  cardImageContainer: {
    height: 150,
    width: null,
    flex: 1,
    marginBottom: 15,
  },
  cardImage: {
    flex: 1,
    borderRadius: 8,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
  },
  cardOverlayContentContainer: {
    padding: 10,
    flex: 1
  },
  cardOverlayContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});
export default styles;