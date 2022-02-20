GameContext:
on the end of the game you need to get two arrays of IWord interface objects
with wrong and correct answered words, in order to pass them to SaveStats() from StatsContext

---

<StatsContetxtProvider/> should be a parrent of <GameContextProvider/>
thats coz you need to get SaveStats function from StatsContext to save the statistics
To get that function you need to destructure object that returns from calling useStats()

---

Inside context you should implement everything you need to construct array of answers for each
question word for game to render by this words

Callback that answers the question

- Countdown befor game starts (maybe only if game started from text book)
- Answer callback that checks an answer and pushes question word to designated array (wrong or correct)
- Pick difficulty that will fetch words for new game and start it
- Callback to progress to next question
- On results you should send arrays of correct and wrong words to SaveStats
- Countdown timer befor start of the game for 5 or 3 seconds
