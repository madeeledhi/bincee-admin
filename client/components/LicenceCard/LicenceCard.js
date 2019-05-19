// lib
import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import CardItem from './CardItem'

// src
import styles from './LicenceCard.less'

const LicenceCard = ({ data }) => {
  return (
    <Card className={styles.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={styles.avatar}>
            L
          </Avatar>
        }
        title="Licences"
      />

      <CardContent>
        <CardItem label={'Total'} value={100} unit={'licences'} />
        <CardItem label={'Active'} value={60} unit={'licences'} />
        <CardItem label={'Inactive'} value={40} unit={'licences'} />
      </CardContent>
    </Card>
  )
}
export default LicenceCard
