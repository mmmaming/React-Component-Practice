import React from 'react';
import PropTypes from 'prop-types';


// Curve.propTypes = {
//   lineOfNum: PropTypes.number,
//   count: PropTypes.number,
//   lineWidth: PropTypes.number,
//   lineSpace: PropTypes.number,
//   lineBold: PropTypes.number
// }


class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default class Matrix extends React.Component {

  /**
   *
   * @param items_length item的个数
   * @param columnNum 每行显示几个item
   * @param lineWidth 每行的线长度
   * @param colGap 行间距
   * @param itemSize item尺寸
   * @param padding 间距
   * @returns {Array}
   */
  renderContent(items_length, columnNum, lineWidth, colGap, itemSize, padding) {
    const points = [];
    let count    = 0;

    const rows   = Math.ceil(items_length / columnNum);
    const rowGap = lineWidth / (columnNum - 1);
    for (var idx_row = 0; idx_row < rows; idx_row++) {
      for (var idx_col = 0; idx_col < columnNum; idx_col++) {
        count++;
        if (items_length < count) {
          break;
        }
        if (idx_row % 2 === 0) {
          points.push(new Point((idx_col * rowGap - itemSize / 2) + padding, (idx_row + 1) * colGap - colGap / 2 - itemSize / 2));
        } else {
          points.push(new Point(((columnNum - (idx_col + 1)) * rowGap - itemSize / 2) + padding, (idx_row + 1) * colGap - colGap / 2 - itemSize / 2));
        }
      }
    }
    return points;

  }

  renderPoints = (list, points) => {
    return list.map((item, key) => {
      return <div key={key} style={{position: 'absolute', left: points[key].x + 'px', top: points[key].y + 'px'}}>
        {this.props.renderPoints(item)}
      </div>
    })
  }

  render() {
    const {list, columnNum, lineWidth, colGap, itemSize, padding} = this.props;
    const points                                                  = this.renderContent(list.length, columnNum, lineWidth, colGap, itemSize, padding);
    // 线间距的一半， 用来计算线的位置
    const halfColGap                                              = colGap / 2;
    let d                                                         = `M${0 - 30} ${halfColGap}`;
    // 行数
    const rows                                                    = Math.ceil(list.length / columnNum);
    // 当元素不满一行时，线的显示长度
    const linePercentage                                          = lineWidth * (list.length % columnNum !== 0 ? (list.length % columnNum - 1) / (columnNum - 1) : 1);
    // 贝塞尔控制点的横坐标偏移量
    const bezierPoint                                             = 40;
    for (let idx_row = 0; idx_row < rows; idx_row++) {
      // 上一条线的高度
      let prevLineHeight    = idx_row * colGap - halfColGap;
      // 当前线的高度  计算贝塞尔控制点用
      let currentLineHeight = idx_row * colGap + halfColGap;
      if (idx_row === 0 && idx_row === rows - 1) {
        d += `  L${linePercentage} ${halfColGap}`;
        break;
      }
      if (idx_row % 2 === 0) {
        if (idx_row === 0) {
          d += ` L${lineWidth} ${halfColGap}`;
        } else {
          if (idx_row === rows - 1) {
            d += ` C${0 - bezierPoint} ${prevLineHeight} ${0 - bezierPoint} ${currentLineHeight} 0 ${currentLineHeight}`;
            d += ` L${linePercentage} ${currentLineHeight}`;
          } else {
            d += ` C${0 - bezierPoint} ${prevLineHeight} ${0 - bezierPoint} ${currentLineHeight} 0 ${currentLineHeight}`;
            d += ` L${lineWidth} ${currentLineHeight}`;
          }
        }
      } else {
        if (idx_row === rows - 1) {
          d += ` C${lineWidth + bezierPoint} ${prevLineHeight} ${lineWidth + bezierPoint} ${currentLineHeight} ${lineWidth} ${currentLineHeight}`;
          d += ` L${lineWidth - linePercentage} ${currentLineHeight}`
        } else {
          d += ` C${lineWidth + bezierPoint} ${prevLineHeight} ${lineWidth + bezierPoint} ${currentLineHeight} ${lineWidth} ${currentLineHeight}`;
          d += ` L0 ${currentLineHeight}`
        }
      }

    }

    return (
        <div style={{
          position: 'relative',
          width   : '100%',
          height  : '100%',
          overflow: 'auto',
          boxSizing: 'border-box'
        }}>
          {this.renderPoints(list, points)}
          <svg height="100%" version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               style={{paddingLeft: this.props.padding,     overflow: 'visible'}}>
            <path style={{
              fill          : 'none', stroke: "#8161be", strokeWidth: 15,
              strokeLinejoin: 'round', strokeLinecap: 'round',
            }} d={d}/>
            <path style={{
              fillOpacity    : 0, stroke: "#9480ca", strokeWidth: 1,
              strokeLinejoin : 'round', strokeLinecap: 'round',
              strokeDasharray: '3 3'
            }} d={d}/>

          </svg>
        </div>
    )
  }
}
