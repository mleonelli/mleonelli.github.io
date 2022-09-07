---
title: Regex considerations for Machine Readable Passport
date: 2022-08-30T09:47:48.529Z
draft: false
featured: true
tags:
  - MRTD
commentable: true
image:
  filename: passport.jpg
  focal_point: Smart
  preview_only: false
---
For a recent project I was looking into Passport Numbers and the, apparently, impossibility to validate them. From there I played with MRTDs or Machine Readable Travel Documents and passports are nowadays one of those, making the customs procedures faster (unless you land in Miami, then it’s going to be a mess anyway).

On a MR Passport there are two lines. Each is 44 characters long, with a filler character &lt; (less sign) in case an empty space is needed. 

Here’s an example of a fictional MR Passport code.

```
P&lt;ITADAVINCI&lt;&lt;LEONARDO&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
L898902C&lt;3ITA6908061F9406236ZE184226B&lt;&lt;&lt;&lt;&lt;14
```

As can be found on the <a href="https://en.wikipedia.org/wiki/Machine-readable_passport">Wikipedia page</a>, the format of the first row can be defined as:

<table>
<tbody><tr>
<th>Positions</th>
<th>Length</th>
<th>Characters</th>
<th>Meaning</th>
</tr>
<tr>
<td>1</td>
<td>1</td>
<td>alpha</td>
<td>P, indicating a passport</td>
</tr>
<tr>
<td>2</td>
<td>1</td>
<td>alpha</td>
<td>Type (for countries that distinguish between different types of passports)</td>
</tr>
<tr>
<td>3–5</td>
<td>3</td>
<td>alpha</td>
<td>Issuing country or organization (ISO 3166-1 alpha-3 code with modifications)</td>
</tr>
<tr>
<td>6–44</td>
<td>39</td>
<td>alpha</td>
<td>Surname, followed by two filler characters, followed by given names. Given names are separated by single filler characters</td>
</tr>
</tbody></table>

<p>and the second row as</p>

<table>
<tbody><tr>
<th>Positions</th>
<th>Length</th>
<th>Characters</th>
<th>Meaning</th>
</tr>
<tr>
<td>1–9</td>
<td>9</td>
<td>alpha+num</td>
<td>Passport number</td>
</tr>
<tr>
<td>10</td>
<td>1</td>
<td>numeric</td>
<td>Check digit over digits 1–9</td>
</tr>
<tr>
<td>11–13</td>
<td>3</td>
<td>alpha</td>
<td>Nationality (ISO 3166-1 alpha-3 code with modifications)</td>
</tr>
<tr>
<td>14–19</td>
<td>6</td>
<td>numeric</td>
<td>Date of birth (YYMMDD)</td>
</tr>
<tr>
<td>20</td>
<td>1</td>
<td>num</td>
<td>Check digit over digits 14–19</td>
</tr>
<tr>
<td>21</td>
<td>1</td>
<td>alpha</td>
<td>Sex (M, F or &lt; for male, female or unspecified)</td>
</tr>
<tr>
<td>22–27</td>
<td>6</td>
<td>numeric</td>
<td>Expiration date of passport (YYMMDD)</td>
</tr>
<tr>
<td>28</td>
<td>1</td>
<td>numeric</td>
<td>Check digit over digits 22–27</td>
</tr>
<tr>
<td>29–42</td>
<td>14</td>
<td>alpha+num</td>
<td>Personal number (may be used by the issuing country as it desires)</td>
</tr>
<tr>
<td>43</td>
<td>1</td>
<td>numeric</td>
<td>Check digit over digits 29–42 (may be &lt; if all characters are &lt;)</td>
</tr>
<tr>
<td>44</td>
<td>1</td>
<td>numeric</td>
<td>Check digit over digits 1–10, 14–20, and 22–43</td>
</tr>
</tbody></table>
<p><br /></p>

<p>From the above specification, here’s a possible implementation of a regex rule which tries to validate, parse and extract data from the the 2 rows.</p>

<p>As a side note</p>

<ol>
  <li>
    <p>Currently I am either able to segment surname and given name or check that the length is 39.</p>
  </li>
  <li>
    <p>States can be checked against the list as in ISO 3166-1 or with a general regex command depending on the needs.</p>
  </li>
  <li>
    <p>Check digits are extracted but not validated in Regex. If interested, the check digit calculation is as follows…</p>
  </li>
</ol>

<ul>
  <li>Convert symbols to integers as per the table below
<br /></li>
</ul>
<table>
<tbody><tr><td>&lt;</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td></tr>
<tr><td>0</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td><td>32</td><td>33</td><td>34</td><td>35</td></tr>
</tbody></table>
<p><br /></p>

<ul>
  <li>
    <p>The value of each integer is then multiplied by its weight; the weight of the first position is 7, of the second it is 3, and of the third it is 1, and after that the weights repeat 7, 3, 1, and so on.</p>
  </li>
  <li>
    <p>All values are added together</p>
  </li>
  <li>
    <p>The remainder of the final value divided by 10 is the check digit.</p>
  </li>
</ul>

<p>Below the implementation or to see it in a better format the same version can be found on <a href="https://regex101.com/r/kI6aG3/6">Regex101</a>; I am planning to give it a check in the near future to see if I can make it better…</p>

```
/^
(?&lt;FirstLine&gt;
  # First line capturing group
  (?&lt;Passport&gt;P)
  # Passport character capturing group (P char, length 1)
  (?&lt;PassportType&gt;.)
  # Passport Type (any char, generally &lt;, length 1)
  (?&lt;IssuingCountry&gt;\[ITA]{3})
  # To be completed with the ISO 3166-1 alpha-3 country codes (length 3)
  # Or in alternative it can be checked for char only as
  # (?&lt;IssuingCountry&gt;\[A-Z&lt;]{3}) if check state not necessary
  (?=\[A-Z&lt;]{39})
  # Passport lookahead for lenght validation -- NOT WORKING
  (?&lt;Surname&gt;\[A-Z]+)
  # Surname, it has to be followed by &lt;&lt;
  &lt;&lt;
  (?&lt;GivenName&gt;
    # Given Name
    (?:\[A-Z]+&lt;?)+
  )
  \[&lt;]+
)
\n
(?&lt;SecondLine&gt;
  # Second Line capturing group
  (?&lt;PassportNumber&gt;\[A-Z0-9&lt;]{9})
  # Passport number, length 9, padded with &lt;
  (?&lt;CheckDigit19&gt;\[0-9]{1})
  # Check digit for position 1 to 9
  (?&lt;Nationality&gt;\g{IssuingCountry})
  # Nationality, follows the same rule as match group 4
  (?&lt;DoB&gt;
    # Date Of Birth
    (?&lt;DoBYear&gt;\[0-9]{2})
    (?&lt;DoBMonth&gt;(?:0\[1-9]|1\[0-2]))
    (?&lt;DoBDay&gt;(?:0\[1-9]|(?:1|2)\[0-9]|3\[01])
    )
  )
  (?&lt;CheckDigit1419&gt;\[0-9])
  # Check digit for position 14 to 19
  (?&lt;Sex&gt;\[MF&lt;])
  # Sex (Male, Female or not defined)
  (?&lt;Expiral&gt;
    # Expiral date
    (?&lt;ExpiralYear&gt;\[0-9]{2})
    (?&lt;ExpiralMonth&gt;(?:0\[1-9]|1\[0-2]))
    (?&lt;ExpiralDay&gt;(?:0\[1-9]|(?:1|2)\[0-9]|3\[01]))
  )
  (?&lt;CheckDigit2227&gt;\[0-9])
  # Check digit for position 22 to 27
  (?&lt;PersonalNumber&gt;\[A-Z0-9&lt;]{14})
  # Personal number padded with &lt;
  (?&lt;CheckDigit2942&gt;\[0-9&lt;])
  # Check digit for position 29 to 42 (can be &lt; empty)
  (?&lt;CheckDigitF&gt;\[0-9])
  # Check digit
)
$/xm
```
