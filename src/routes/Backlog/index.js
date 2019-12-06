import React, { Component } from 'react'

import BackList from './List'

import PageHeader from '@/components/PageHeader'

import './index.less'

class Backlog extends Component {
	render () {
		return (
		<div className="basic-backlog">
			<PageHeader />
			<BackList />
		</div>
		)
	}
}

export default Backlog