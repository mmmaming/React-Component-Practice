/*eslint-disable*/
import React, { PropTypes } from 'react';
import './picker-view.css';
export default class PickerView extends React.Component {

	static propTypes = {
		itemHeight: PropTypes.number,
		onChange: PropTypes.func,
		pickerViewIndex: PropTypes.number,
		defaultIndex: PropTypes.number,
		rowCount: PropTypes.number
	}

	static defaultProps = {
		itemHeight: 34,
		pickerViewIndex: -1,
		defaultIndex: 0,
		rowCount: 7,
		list: []
	}


  params = {
    offsetsY: 0,
    touching: false,
    startTranslate: 0,
    touchId: undefined,
  };

  constructor(props){
    super(props);
    this.state = {
      translate: 0,
      totalHeight: props.list.length * props.itemHeight,
      animating: true
    }
    this.upperCount = Math.floor(props.rowCount / 2);
    this.indicatorTop = props.itemHeight * this.upperCount;
  }

  touchStart = (e) => {
    if (this.params.touching || this.props.list.length <= 1) {
      return;
    }
    this.setState({
      animating: false
    });
    Object.assign(this.params, {
      offsetsY: e.targetTouches[0].pageY - this.state.translate,
      touching: true,
      startTranslate: this.state.translate,
      touchId: e.targetTouches[0].identifier,
    })
  }

  touchMove = (e) => {

    if(e.targetTouches[0].identifier !== this.params.touchId) {
      return;
    }

    const pageY = e.targetTouches[0].pageY;
    const diffY = pageY - this.params.offsetsY;

    this.setState({
      translate: diffY
    })
  }

  touchEnd = () => {

    const { itemHeight } = this.props;
    let resetIndexFlag = true;
    let translate = this.state.translate;

    if (translate === this.params.startTranslate) {
      resetIndexFlag = false;
    } else {
      if( Math.abs(translate - this.params.startTranslate) < ( itemHeight * 0.51 ) ){
        translate = this.params.startTranslate;
      }else if(translate > this.indicatorTop) {
        translate = this.indicatorTop;
      }else if(translate + this.state.totalHeight  < this.indicatorTop + itemHeight) {
        translate = this.indicatorTop + itemHeight - this.state.totalHeight;
      }else{
        let rows = (translate - this.params.startTranslate) / itemHeight;
        let integer = Math.floor(rows);
        let decimal = rows - integer;
        if (Math.abs(decimal) > 0.5) {
          integer = rows >= 0 ? integer + 1 : integer - 1;
        }
        translate = this.params.startTranslate + ( integer * itemHeight );
      }
    }

    this.setState({
      animating: true,
      translate
    }, () => {
      Object.assign(this.params, {
        offsetsY: 0,
        touching: false,
        startTranslate: 0,
        touchId: undefined,

      });
      if (resetIndexFlag) {
        this.selected();
      }
    });

  }

  adjustPosition = (props) => {
    const { list, itemHeight, defaultIndex } = props;
    const totalHeight = list.length * itemHeight;
    let translate;

    if(defaultIndex > -1) {
      translate = (this.upperCount - defaultIndex) * itemHeight;
    } else {
      translate = this.indicatorTop;
    }

    this.setState({
      translate,
      totalHeight
    });
  }

  selected = (propagate = true) => {
    let index;
    const { translate } = this.state;
    const { list, itemHeight, onChange, pickerViewIndex } = this.props;

    index = (this.indicatorTop - translate) / itemHeight;
    if(onChange && propagate) onChange(list[index], index, pickerViewIndex);
  }

  componentDidMount(){
    this.adjustPosition(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.adjustPosition(nextProps);
  }

	render() {
		const { itemHeight, list } = this.props;
		return (
				<div className="picker-view"
						 onTouchStart={this.touchStart}
				     onTouchMove={this.touchMove}
						 onTouchEnd={this.touchEnd}>
					<div className="picker-view-mask" style={{
						backgroundSize: `100% ${itemHeight * this.upperCount}px`
					}}></div>
					<div className="indicator" style={{
						height: itemHeight,
						top: this.indicatorTop
					}}></div>
					<div className="picker-view-content"
							 style={{
								 transform: `translate(0, ${this.state.translate}px)`,
								 transition : this.state.animating ? 'transform 0.5s' : 'none'
							 }}
					>
						{
							list.map(item => {
								return (
										<div key={item.name} className="picker-view-item"
												 style={{height: `${itemHeight}px`, lineHeight: `${itemHeight}px`}}
										>{ item.name }</div>
								)
							})
						}
					</div>
				</div>
		);
	}
}
