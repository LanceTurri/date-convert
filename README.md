# Sentence Format Date Translator
This library is meant for applications to take dates in a standard format (string or Date object) and convert them into human readable, sentence format. It's especially useful for ADA optimizations since screen readers do not read dates very well. 

## Translate the Dates!
There are two main functions in this library now, translating a date, and a translating a date with time. The method will take any string date or Date object and convert it to a sentence. This is an example of how to use it:

```javascript
convertDate("2015-03-25") // 'March twenty fifth two thousand fifteen'
```

Any format that can be read by the Date constructor will be able to be converted. Here are some common formats:

```javascript
convertDate('2010-03-25') // 'March twenty fifth two thousand ten'
convertDate('07/04/1776') // 'July fourth seventeen seventy six'
convertDate('August 29 2456') // 'August twenty ninth two thousand fifty six'
convertDate('01/01/2000') // 'January first two thousand'
convertDate('Tuesday March 15, 462') // 'March fifteenth four hundred sixty two'
```

