class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  render(){
    if (this.props.loaded) {
      return(
        <View style={styles.loaingContainer}>
          <Image source={require('../../../src/assets/images/Icons/ring.gif')} style={{width: 25, height: 25}} />
        </View>
      )
    }
    return(
      <View></View>
    )
  }
}
