'use strict';
import React from 'react';
import {StyleSheet, Animated} from 'react-native';
import PropTypes from 'prop-types';

export default class FloatingLabel extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    const posTop = props.hasValue ? props.posTop : props.posBottom;
    const fontSize = props.hasValue ? props.fontSmall : props.fontLarge;
    this.state = {
      top: new Animated.Value(posTop),
      fontSize: new Animated.Value(fontSize)
    };
  }
  floatLabel() {
    Animated.parallel([
      Animated.timing(this.state.top, {
        toValue: this.props.posTop,
        duration: this.props.duration
      }),
      Animated.timing(this.state.fontSize, {
        toValue: this.props.fontSmall,
        duration: this.props.duration
      })
    ]).start();
  }
  sinkLabel() {
    Animated.parallel([
      Animated.timing(this.state.top, {
        toValue: this.props.posBottom,
        duration: this.props.duration
      }),
      Animated.timing(this.state.fontSize, {
        toValue: this.props.fontLarge,
        duration: this.props.duration
      })
    ]).start();
  }
  render(): Object {
    let {label, labelColor, highlightColor, style} = this.props;
    return (
      <Animated.Text
        style={[
          {
            fontSize: this.state.fontSize,
            top: this.state.top,
            color: labelColor
          },
          styles.labelText,
          this.props.isFocused && {
            color: highlightColor
          },
          style
        ]}
        onPress={() => {
          this.props.focusHandler();
        }}>
        {label}
      </Animated.Text>
    );
  }
}

FloatingLabel.propTypes = {
  duration: PropTypes.number,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  highlightColor: PropTypes.string,
  style: PropTypes.object,
  posTop: PropTypes.number,
  posBottom: PropTypes.number,
  fontLarge: PropTypes.number,
  fontSmall: PropTypes.number
};

const styles = StyleSheet.create({
  labelText: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'rgba(0,0,0,0)'
  }
});
