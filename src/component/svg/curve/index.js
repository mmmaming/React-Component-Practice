import React from 'react';
import PropTypes from 'prop-types';
class Curve extends React.Component {
  render() {
    return (
        <svg width="100%" height="100%" version="1.1"
             xmlns="http://www.w3.org/2000/svg">

          <path style={{
            fill          : 'none', stroke: "#8161be", strokeWidth: 15,
            strokeLinejoin: 'round', strokeLinecap: 'round',
          }} d={`
              M25 18.5
              L348 18.5
              C368 33.5 368 63.5 348 78.5
              L25 78.5
              C-5 78.5 -5 138.5 25 138.5
              L348 138.5
              C368 153.5 368 183.5 348 198.5
              L25 198.5
              C5 213.5 5 243.5 25 258.5
              L348 258.5
              `}/>

          <path style={{
            fillOpacity    : 0, stroke: "white", strokeWidth: 1,
            strokeLinejoin : 'round', strokeLinecap: 'round',
            strokeDasharray: '3 3'
          }} d="
            M25 18.5
            L348 18.5
            C368 33.5 368 63.5 348 78.5
            L25 78.5
            C5 93.5 5 123.5 25 138.5
            L348 138.5
            C368 153.5 368 183.5 348 198.5
            L25 198.5
            C5 213.5 5 243.5 25 258.5
            L348 258.5
            "/>

        </svg>
    )
  }
}

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
    const halfColGap                                              = colGap / 2;
    let d                                                         = `M0 ${halfColGap}`;
    const rows                                                    = Math.ceil(list.length / columnNum);
    for (let idx_row = 0; idx_row < rows; idx_row++) {
      if (idx_row % 2 === 0) {
        // 如果是第一行且只有一行
        if (idx_row === 0 && idx_row === rows - 1) {
          d += `  L${lineWidth * (list.length % columnNum !== 0 ? (list.length % columnNum - 1) / (columnNum - 1) : 1)} ${halfColGap}`;
        // 如果是第一行且不仅有一行
        } else {
          if (idx_row === 0 ) {
            d += ` L${lineWidth} ${halfColGap}`;
          } else {
             if (idx_row === rows - 1) {
               d += ` C${0 - 40} ${idx_row * colGap - halfColGap} ${0 - 40} ${idx_row * colGap + halfColGap} 0 ${idx_row * colGap + halfColGap}`;
               d += ` L${lineWidth * (list.length % columnNum !== 0 ?  (list.length % columnNum - 1) / (columnNum - 1) : 1)} ${idx_row * colGap + halfColGap}`;
             } else {
               d += ` C${0 - 40} ${idx_row * colGap - halfColGap} ${0 - 40} ${idx_row * colGap + halfColGap} 0 ${idx_row * colGap + halfColGap}`;
               d += ` L${lineWidth} ${idx_row * colGap + halfColGap}`;
             }
          }
        }
      } else {
        if (idx_row === rows - 1) {
          d += ` C${lineWidth + 40} ${idx_row * colGap - halfColGap} ${lineWidth + 40} ${idx_row * colGap + halfColGap} ${lineWidth} ${idx_row * colGap + halfColGap}`;
          d += ` L${lineWidth - lineWidth * (list.length % columnNum !== 0 ?   (list.length % columnNum - 1) / (columnNum - 1) : 1)} ${idx_row * colGap + halfColGap}`
        } else {
          d += ` C${lineWidth + 40} ${idx_row * colGap - halfColGap} ${lineWidth + 40} ${idx_row * colGap + halfColGap} ${lineWidth} ${idx_row * colGap + halfColGap}`;
          d += ` L0 ${idx_row * colGap + halfColGap}`
        }
      }
    }
    return (
        <div style={{
          position  : 'relative',
          marginTop : '100px',
          marginLeft: '100px',
          border    : '1px solid red',
          height    : '100%'
        }}>
          {this.renderPoints(list, points)}
          <svg width="100%" height="100%" version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               style={{paddingLeft: this.props.padding}}>
            <path style={{
              fill          : 'none', stroke: "#8161be", strokeWidth: 15,
              strokeLinejoin: 'round', strokeLinecap: 'round',
            }} d={d}/>
            <path style={{
              fillOpacity    : 0, stroke: "white", strokeWidth: 1,
              strokeLinejoin : 'round', strokeLinecap: 'round',
              strokeDasharray: '3 3'
            }} d={d}/>

          </svg>
        </div>
    )
  }
}
