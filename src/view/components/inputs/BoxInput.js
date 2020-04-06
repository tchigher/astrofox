import React, { PureComponent } from 'react';
import withMouseEvents from 'components/hocs/withMouseEvents';
import { clamp } from 'utils/math.js';
import styles from './BoxInput.less';

class BoxInput extends PureComponent {
  static defaultProps = {
    name: 'box',
    minWidth: 1,
    minHeight: 1,
    value: {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    },
    maxWidth: 100,
    maxHeight: 100,
    onChange: () => {},
  };

  state = {
    resizing: false,
  };

  componentDidMount() {
    this.props.mouseUp(this.endResize, true);
  }

  componentWillUnmount() {
    const { mouseMove, mouseUp } = this.props;

    mouseMove(this.handleMouseMove, false);
    mouseUp(this.endResize, false);
  }

  handleMouseMove = e => {
    const {
      resizing,
      position,
      startX,
      startY,
      startWidth,
      startHeight,
      startTop,
      startLeft,
    } = this.state;

    if (resizing) {
      const { minWidth, minHeight, maxWidth, maxHeight, name, value, onChange } = this.props;

      let { x, y, width, height } = value;

      const dx = e.pageX - startX;
      const dy = e.pageY - startY;

      switch (position) {
        case 'top':
          y = clamp(startTop + dy, 0, startTop + startHeight - minHeight);
          height = clamp(startHeight - dy, minHeight, startTop + startHeight);
          break;
        case 'right':
          width = clamp(startWidth + dx, minWidth, maxWidth - startLeft);
          break;
        case 'bottom':
          height = clamp(startHeight + dy, minHeight, maxHeight - startTop);
          break;
        case 'left':
          x = clamp(startLeft + dx, 0, startLeft + startWidth - minWidth);
          width = clamp(startWidth - dx, minWidth, startLeft + startWidth);
          break;
        case 'center':
          x = clamp(startLeft + dx, 0, maxWidth - startWidth);
          y = clamp(startTop + dy, 0, maxHeight - startHeight);
          break;
      }

      onChange(name, { x, y, width, height });
    }
  };

  startResize = pos => e => {
    e.stopPropagation();

    const {
      value: { x, y, width, height },
      mouseMove,
    } = this.props;

    this.setState({
      resizing: true,
      position: pos,
      startX: e.pageX,
      startY: e.pageY,
      startWidth: width,
      startHeight: height,
      startLeft: x,
      startTop: y,
    });

    mouseMove(this.handleMouseMove, true);
  };

  endResize = () => {
    this.setState({ resizing: false });

    this.props.mouseMove(this.handleMouseMove, false);
  };

  render() {
    const { x, y, width, height } = this.props.value;

    return (
      <div
        className={styles.box}
        style={{
          width,
          height,
          top: y,
          left: x,
        }}
      >
        <div
          role="presentation"
          className={styles.center}
          onMouseDown={this.startResize('center')}
        />
        <div role="presentation" className={styles.top} onMouseDown={this.startResize('top')} />
        <div role="presentation" className={styles.right} onMouseDown={this.startResize('right')} />
        <div
          role="presentation"
          className={styles.bottom}
          onMouseDown={this.startResize('bottom')}
        />
        <div role="presentation" className={styles.left} onMouseDown={this.startResize('left')} />
      </div>
    );
  }
}

export default withMouseEvents(BoxInput);