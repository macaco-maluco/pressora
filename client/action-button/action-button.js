import React from 'react'

export default React.createClass({
  propTypes: {
    action: React.PropTypes.string,
    status: React.PropTypes.string,
    onClick: React.PropTypes.func,
    index: React.PropTypes.number
  },

  render: function () {
    const html = { __html: this.props.action === 'empty' ? this.props.index + 1 : '&nbsp;' }

    return <button onTouchStart={this.props.onClick}
                   onClick={this.props.onClick}
                   className={`action-button action-button-${this.props.action}
                   ${this.props.status}`}
                   dangerouslySetInnerHTML={html}/>
  }
})
