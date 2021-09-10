import {  useState } from 'react'
import { fetchQuotes } from '@/api/quoteApi'
import { useApiStatus } from '@/api/hooks/useApiStatus'
import { ERROR, IDLE, PENDING, SUCCESS } from '@/api/constants/apiStatus'

const Quotes = (props) => {
  const [quotes, setQuotes] = useState([])
  const { setStatus, isPending, isIdle, isError, isSuccess } =
    useApiStatus(IDLE)

  const initFetchQuotes = async () => {
    try {
      setStatus(PENDING)
      const quotesData = await fetchQuotes()
      setQuotes(quotesData)
      setStatus(SUCCESS)
    } catch (error) {
      setStatus(ERROR)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="font-semibold text-2xl mb-4 max-w-2xl">Quotes</h2>
      <div>
        {isPending ? <p>Loading quotes...</p> : null}
        {isError ? <p>There was a problem</p> : null}
        {isIdle ? (
          <button
            className="px-4 py-3 bg-blue-700 text-blue-100"
            onClick={initFetchQuotes}
          >
            Fetch quotes
          </button>
        ) : null}

        {isSuccess
          ? quotes.map((quote) => {
              return (
                <blockquote
                  key={quote.id}
                  className="relative p-4 text-xl italic border-l-4"
                >
                  <p className="mb-4">"{quote.quote}"</p>
                  <cite className="flex items-center justify-center">
                    <div className="flex flex-col items-start">
                      <span className="mb-1 text-sm italic font-bold">
                        {quote.author}
                      </span>
                    </div>
                  </cite>
                </blockquote>
              )
            })
          : null}
      </div>
    </div>
  )
}

export default Quotes