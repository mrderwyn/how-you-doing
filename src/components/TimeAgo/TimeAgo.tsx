import React from 'react'

import styles from './TimeAgo.module.css'

const twoDigitsFormat = (n: number) => {
  return n.toString().padStart(2, '0')
}

const localTime = (date: Date) => {
  const time = date.toLocaleTimeString([], { hour12: false })
  return time.split(':').slice(0, 2).join(':')
}

const parseDate = (date: Date) => {
  const now = new Date()
  const diff = +now - +date

  if (diff < 60000) {
    return 'Just now'
  }

  if (diff < 3600000) {
    return `${Math.floor(diff / 60000)} minutes ago`
  }
  if (diff < 14400000) {
    return `${Math.floor(diff / 3600000)} hours ago at ${localTime(date)}`
  }

  if (date.toDateString() === now.toDateString()) {
    return `Today at ${localTime(date)}`
  }

  if (date.toDateString() === new Date(+now - 86400000).toDateString()) {
    return `Yesterday at ${localTime(date)}`
  }

  if (date.getFullYear() === now.getFullYear()) {
    return `${twoDigitsFormat(date.getDate())}.${twoDigitsFormat(date.getMonth() + 1)} at ${localTime(date)}`
  }

  return `${twoDigitsFormat(date.getDate())}.${twoDigitsFormat(date.getMonth() + 1)}.${date.getFullYear()} at ${localTime(date)}`
}

interface TimeAgoPropsType {
  date: Date
}

const TimeAgo: React.FC<TimeAgoPropsType> = ({ date }: TimeAgoPropsType) => {
  return <p className={styles.date}>{parseDate(date)}</p>
}

export default TimeAgo
