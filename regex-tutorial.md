# Begginers Guide on how to use REGEX

Regex stands for Regular Expression. With Regex we are able to find and check a string to see if what is within the string is either true or false,
or by manipulating data by adding, removing, or replacing.

So instead of creating a complex function fullof if statements, we can just use regex, to do our checks and manipulation we as little code as possible.
here we just use regex to check and validate the hex value and returns as true.
```
    const hex = '#42f2f5';
    const regex = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/;
    const wordRegex = regex.test(hex);
    console.log(wordRegex);
```
Here we are checking to see if the hex starts with a #, and contains letters a-f, and numbers 0-9 at the length of 6 OR the same validation but with the length of 3.

## Summary

Here is an example of a code that is using regex to find a Capital E in the string of Example.
If the word contains that capital E, then it returns as a true statement in the console.log.
```
    const word = 'Example';
    const regex = /E/;
    const wordRegex = regex.test(word);
    console.log(wordRegex);
```
Here is another example that is True since Example is inside the string, even if it doesn't start with it.
```
    const word = 'Another Example';
    const regex = /Example/;
    const wordRegex = regex.test(word);
    console.log(wordRegex);
```
Then here is one that is False
```
    const word = 'false example';
    const regex = /False Example/;
    const wordRegex = regex.test(word);
    console.log(wordRegex);
```
The reason this on is false is because of the nature of regex being case sensitive. Since the regex was looking for a Capital F and E in the string, but couldn't find it, therefore it returned a false statement.

This is how we can do basic matches and serches of a string with regex

Much like in Javascript, where an array must be in [square brackets] or an Object will be in {curly brackets},
a regex must be wrapped in a slash like this 
```
/regex/
```

In this tutorial we will be using a regex that matches a HEX value
- a hex value being #42f2f5 as an example (This hex is for a light-blue color)

```
/^#?([a-f0-9]{6}|[a-f0-9]{3})$/
```

we will check to see that in this regex we are doing the following things
- The hex value might start with a # with ?
- The string contains the characters a-f and the numbers 0-9 AND the string length is 6
- OR the string contains the characters a-f and the numbers 0-9 AND the string length is 3

## Table of Contents

- [Anchors](#anchors)
- [Quantifiers](#quantifiers)
- [Grouping Constructs](#grouping-constructs)
- [Bracket Expressions](#bracket-expressions)
- [Character Classes](#character-classes)
- [The OR Operator](#the-or-operator)
- [Flags](#flags)
- [Character Escapes](#character-escapes)

## Regex Components

### Anchors

Anchors are what are used to check the beggining and the end of a string using either a ^ character at the beggining and a $ at the end of the regex.
Here in the hex regex, we can see the ^ and the $ being used to check the string starts with a # and ends with the hex value using [a-f0-9] that checks the string itself to make sure it matches that pattern.
```
/^# //This is checking if the string starts with #
```
```
([a-f0-9]{6}|[a-f0-9]{3})$/ //The $ at the end is validating everything inside the () which contains the validation for the hex value itself.
```

with ^ and $ together, The string must match everything the regex is requiring. This would be a sort of hard validation.

### Quantifiers

With Quantifiers we can set limits to the regex on how many times the pattern matches in the string.
Quantifiers can be classified as either Greedy, or Lazy.
With Greedy we will get as many matches as possible depending on what we add to the pattern
Where as lazy, it just matches as little as possible.

Greedy wants more.
Lazy wants less.

Here are components of Greedy

- '*' Matches the pattern zero or more times, this makes this more of a wildcard Quantifier since the element before doesn't need to exist.
    - example:
    ```
    const str = 'Teeeeeeest';
    const regex = /Te*/;
    const wordRegex = str.match(regex);
    console.log(wordRegex);
    ```
    Will return Teeeeeee because it took the e and checked for every occurence of e after Te
    now lets say that the string was just Tst, then we will get T returned since 0 occurences still count as true
- '+' as opposed to the *, the + will match an occurence one or more times
    ```
    const str = 'Teeeeeeest';
    const regex = /Te+/;
    const wordRegex = str.match(regex);
    console.log(wordRegex);
    ```
    Will return as true, but is we had the string as Tst, instead we will get a false statement because there has to be at least ONE occurence of e in the string
- {} The curly brackets have multiple ways to add limits for what we are trying to match in the string
    - with the hex regex from before, we are using curly brackets to set a limit of a length of characters to match
        - /^#?([a-f0-9]{6}|[a-f0-9]{3})$/
    - {6} and {3} are the limits here, we are checking first if the length is 6 characters long that match the characters and numbers in the brackets. OR the same thing but with 3
    - The other two ways are {min, } and {min, max}
        - if we do {2,} then we get a minimum number of times the pattern matches.
        - And if we do something like {2, 10}, we are instead making sure the pattern matches a minimum of 2 and a maximum of 10 times.

Here is a lazy quantifier, that we are also using in our hex regex

- ? will match the pattern 0 or 1 time.
    - Here is how it works in the hex regex.
    ```
    /^#?([a-f0-9]{6}|[a-f0-9]{3})$/
    ```
    - Here the ? is being used on the # symmbol, to check to see if our hex code is starting with a # or not.
    - our hex being #42f2f5, and since it starts with # then that counts as a single occurence which is true
    - Now lets say out hex being checked is just 42f2f5 without the #, then by adding the ? to the #, we still get a true statement since that counts as a zero occurence.

### Grouping Constructs

Grouping sections is done by putting the regex in a ()
much like our expression we've been using. Contains part of out expression in a ()
```
([a-f0-9]{6}|[a-f0-9]{3})
```
This is being used to group and match parts of the hex value. The only exception is the | which counts as an OR operator, but that will be explained later on.
With these two options being grouped, we are given an option for this group.
```
/^#?([a-f0-9]{6}|[a-f0-9]{3})$/
```
This would only count as a single group, lets say we had another group, Then that would be a new pattern to match AFTER the first pattern as well.
Here is an example with two groups instead of one like in our hex regex
```
const str = 'abc123';
const regex = /^([a-z]{3})([1-3]{3})$/;
const wordRegex = regex.test(str);
console.log(wordRegex);
```
In group 1 , we have ([a-z]{3}), where we are checking the first 3 letters to be between a-z, so far its true
Then in group 2, we are checking that the next 3 characters are numbers between 1-3.
Since the string matches the criteria, we are met with a true statement.

What if we flipped the string and did '123abc'
Then we are met with a false statement. 

We can use Grouping Constructs to create patterns within the pattern to check for specific validations in different parts of the string.

### Bracket Expressions

With Brackets such as [], we can check for a range of items, from characters to numbers, and with underscores and hyphens _-.
- The two most common bracket ranges are [a-z], and [0-9]
    - With [a-z], we are not limited to just a-z, but we can also do different ranges such as [a-h], [h-o], [o-z].
        - Currently [a-z] only checks for lowecase characters, where as [A-Z] Checks for uppercase
        - This way we can check for specific ranges like in our hex regex where we need [a-f] since Hex values can only have a-f
    - With [0-9] its the same as before, we are choosing numbers between 0-9, but we can also do [2-5] or [7-8].
        - In our Hex code, we will be needing [0-9].
- We can also use [_-] since sometimes we may have characters that do have an underscore or a hyphen.
- We can combine the ranges together like this [A-Za-z0-9_-] so that we can match everything between a-z, match 0-9 and have an _ or -

Back to our Hex Regex.
```
/^#?([a-f0-9]{6}|[a-f0-9]{3})$/
```
We are using [a-f0-9] to look for just items between a-f or 0-9 for each position in the string.

What if we don't want a specific letters, like [g-z]
We would then have to add the ^ which is different in this case depending on where you place it.
If we put it in the bracket like this [^g-z] then it will count as a NOT, meaning don't include the characters g-z
Where as we normally would put ^ at the beggining of the expression would mean its an anchor.

### Character Classes

In Regex, character classes are used to define characters that may or may not appear in a string.
With a quick example, back in the Grouping Brackets section, we have covered some character classes, such as a-z, and 0-9.
Those aren't the only character classes that we can use though. We also have other characters that we can use, that do other specific functions.
instead here are some of the character classes we can also use.
Some Character Classes must go inside brackets [] in order for them to work.

- . (Dot) works as a wildcard type of expression, where the . will match any character in the expression.
    - here are some examples:
    ```
    const str = `Hello World.`
    const regex = /./;
    const wordRegex = str.match(regex);
    console.log(wordRegex);
    ```
    - Here we would get just H returned because we are only looking for any single character in the beggining of the string. if we did this instead
    ```
    const regex = /.+/ 
    ```
    - We would instead get the entire string returned because its going to keep returning any character throught the string. Even if we did this too:
    ```
    const regex = /H.llo W...d/;
    ``` 
    - We would get the entire string returned to us since . (dot) is just looking for any character in that position.
- \d is a character class we can use as a shorthand for [0-9] to shorten our expression up a bit. To be precise, it just matches any numerical digit. 
    - Just for a quick example
    ```
    const str = `0a1b2c3d4e5f6g7h8i9j`
    const regex = /\d/g;
    const wordRegex = str.match(regex);
    console.log(wordRegex);
    ```
    - In this example we are looking for every occurence of a digit using \d and adding the g flag. We are then returned all the digits ignoring all the letters in between.
    - \D is the counterpart of \d, meaning any character that is NOT a digit. So if we take out code and do this instead:
    ```
    const regex = /\D/g;
    ``` 
    - We instead get the letters returned to us.
- \w is the charafter class for digits and alphabet lettrs in both upper and lowecase formats, including the _. So instead of having to write out [a-zA-Z0-9_].
    - So lets take the previous example, and change our string and regex consts to this:
    ```
    const str = `0a1b2c3?,d!4e5@f6;g'7h8i9j`
    const regex = /\w\g;
    ```
    - Now that we have added other characters such as a ? and !, we can then run the match, and we would get only the letters and numbers returned, ignoring all the special characters.
    - \W would be the oppossite of \w, so with the sae example as before here, we would get all the special characters returned.
- \s class would be for the spaces and nothing else
    - Just for a quick example, lets do this:
    ```
    const str = `a 0 ? g ' _    `
    const regex = /\s/g;
    const wordRegex = str.match(regex);
    console.log(wordRegex);
    ```
    - We will get just the white spaces returned to us.
    - \S is just going to be the opposite again, and instead we would get everything BUT the white spaces returned.
- Just to bring back the previous character classes we have covered, here they are
    - [a-z] finds lowercase characters within the range of a-z, readjustable so it can be [f-p]
    - [A-Z] same as above, but for uppercase characters
    - [0-9] looks for any digit between 0-9, can also be adjusted like this [4-6]

### The OR Operator
We can add logic to our expressions by adding an or statement

 - | would be how we create an or statement within out expression

With out hex regex, we can see how we have an or statement added in.
```
/^#?([a-f0-9]{6}|[a-f0-9]{3})$/
```

withing the () we see how we are looking for a hex length of 6 or 3.
In this grouping we are checking first if the hex matches the criteria of 6 characters long, if it doesn't then it checks the length of 3 to be more specific.
Here is an example of another code using |
```
const str = 'abc123';
const regex = /([d-z])|([0-9])/;
const wordRegex = regex.test(str);
console.log(wordRegex);
```
This will return true because of group 2 being true with the string containing 0-9
Now we would get false if we did this instead
```
const str = 'abc123';
const regex = /([d-z])|([4-9])/;
const wordRegex = regex.test(str);
console.log(wordRegex);
```
Since we no longer have anything in the expression that matches the string it will be false regardless of group.

Another example being 
```
const str = 'Hello';
const regex = /Hi|Hello/;
const wordRegex = regex.test(str);
console.log(wordRegex);
```
This will be true because the expression checks to see if Hi or Hello is in the string.
### Flags
To add a flag with regex, we would need to add it at the end off the slash on the expression like this /hello/g
- Ignore Case flag or Cases-sensitive search - /i
    - Using i, we are able to add a flag for ignoring if something in the regex is upper or lowercase, since regex is case sensitive.
    - Here is an example of i being used
    ```
    const str = 'hello';
    const regex = /Hello/i;
    const wordRegex = regex.test(str);
    console.log(wordRegex);
    ```
    - So before the expression had to match the string exactly because of the case sensitive nature of regex. but here we are instead saying to ignore the case sensitivity
    ```
    const str = 'ABCDEFG';
    const regex = /[a-z]/i;
    const wordRegex = regex.test(str);
    console.log(wordRegex);
    ```
    - Once again, we are now doing a range. Even though the range is asking for lowercase, and our string being strictly uppercase, we are still getting a true statement because of /i ignoring the case sensitivity
- Repeat Case Flag, or global search - /g
    - With g, we are able to check for every single occurence of a character in the string
    - Here is an example:
    ```
    const str = 'Hello world! Today is a nice day!';
    const regex = /[A-Za-z]/g;
    const wordRegex = str.match(regex);
    console.log(wordRegex);
    ```
    - Here we are returned with an array of all the occurences where there was an upper and lowercase letter
    ```
    [
    'H', 'e', 'l', 'l', 'o', 'w',
    'o', 'r', 'l', 'd', 'T', 'o',
    'd', 'a', 'y', 'i', 's', 'a',
    'n', 'i', 'c', 'e', 'd', 'a',
    'y'
    ]
    ```
    - How about we do something like this instead, where we are checking everytime the letter 'o' occurs in our string:
    ```
    const str = 'onomatopoeia';
    const regex = /o/g;
    const wordRegex = str.match(regex);
    console.log(wordRegex);
    ```
    - We are then returned with this array of occurences, which matches the number of 'o's in our string:
    ```
    [ 'o', 'o', 'o', 'o' ]
    ```
- Lastly we have the multi-line search - /m
    - with /m we can deal with strings that are multiple lines as opposed to being in the sae line.
    ```
    const str = `
    line 1 
    line 2
    line 3
    `;
    const regex = /^\w+/gm;
    const wordRegex = str.match(regex);
    console.log(wordRegex);
    ```
    - Here we will be returned:
    ```
    [ 'line', 'line', 'line' ]
    ```
    - But if we do this instead to our string:
    ```
    const str = `line 1 line 2
    line 3
    `;
    ```
    - We will get this output because its only checking for the first and second line now since the /m is going through each individual line.:
    ```
    [ 'line', 'line' ]
    ```
### Character Escapes

Sometimes we need to use certain characters that are being used by regex to define something, such as a . (dot) or () (Curly Bracket) where we may need to match that character.
lets say we do need a dot but we aren't trying to be its character class where it matches any character. We just want only the dot to be found in the string.
In order to remove the character class functionality for a character like dot, we would add a backslash before the character, like this

- \. removes the wildcard sort of functionality we had before, here is an example:
    
```
const str = `Hello world.`
const regex = /\./g;
const wordRegex = str.match(regex);
console.log(wordRegex);
```

- Before if we didn't use a backslash \, we would get the entire string returned (remember we are using the g anchor to get every occurence in the string to appear), but here we add the backslash and we just get the dot in the string returned since the regex was only looking the the dot character.

What if we want to use something like brackets [], parentheses (), even slashes / \ too, we would still use the backslash to remove their functionality like this.

- Here is an example of us looking for every of the common regex characters that have functionality.
```
const str = `?/\.[]{}()+*`
const regex = /[\?\/\\\.\[\]\{\}\(\)\+\*]+/;
const wordRegex = str.match(regex);
console.log(wordRegex);
```
- We added everything in a bracket to search for each character. then for every single character, we add a \ then the character we need to escape their functionality for.
with this, we can get the entire string returned.

## Author

Created by Nathan Shaw
UCI Bootcamp Student 2022-2023
- github: [nshaw973](https://github.com/nshaw973)