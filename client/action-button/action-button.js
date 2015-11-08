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
                   title={this.getTitle()}
                   className={`action-button action-button-${this.props.action}
                   ${this.props.status}`}
                   dangerouslySetInnerHTML={html}/>
  },

  getTitle: function () {
    const title = titles[this.props.action]
    return title || ''
  }
})

const titles = {
  'forward': 'Move the ship forward',
  'backward': 'Move the ship backward',
  'spin-left': 'Turn the ship right',
  'spin-right': 'Turn the ship left',
  'beam': 'Fire a beam forward',
  'blast': 'Trigger a blast arround the ship',
  'shield': 'Raise a shield to defend against an attack',
  'recharge': 'Recharge the ship battery',
  'empty': 'Click to select an action'
}
