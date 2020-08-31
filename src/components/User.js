import React from 'react';
import {connect} from 'react-redux'
import { render } from '@testing-library/react';
import Avatar from 'antd/lib/avatar/avatar';
import _default from 'antd/lib/time-picker';
import { Typography, Space } from 'antd';
const { Text, Link } = Typography;

const User = ({name,photo_50})=>{
        return(
            <span><Text type="strong">{name}</Text>&nbsp;<Avatar src={photo_50}></Avatar></span>
        )
}

const mapStateToProps = state => {
    return {
        name: state.session.user.name,
        photo_50: state.session.user.photo_50
    }
}

export default connect(mapStateToProps,null)(User)