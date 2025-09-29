import React from 'react'
import Hero from '../sections/Hero'
import FitnessQuiz from '../sections/FitnessQuiz'
import { allQuestions } from '../quizData'
import TrainersSection from '../sections/TrainersSection'
import MembershipSection from '../sections/MembershipSection'
import AchievementsSection from '../sections/AchievementsSection'
import TestimonialsSection from '../sections/TestimonialsSection'

function Home() {
  return (
    <>
    <Hero/>
    
    <FitnessQuiz allQuestions={allQuestions} />

    <TrainersSection />

     <MembershipSection />

     <AchievementsSection />

      <TestimonialsSection />

    </>
  )
}

export default Home