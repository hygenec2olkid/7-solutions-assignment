package main

import "fmt"

func main() {
	var input string
	fmt.Scan(&input)
	decodeWithMinValue(input)

}

func decodeWithMinValue(encode string) {
	l := len(encode) + 1
	decode := make([]int, l)

	for i, char := range encode {
		// first character set 2 index
		if i == 0 {
			switch char {
			case 'L':
				decode[0], decode[1] = 1, 0
			case 'R':
				decode[0], decode[1] = 0, 1
			}
		} else {
			prevValue := decode[i]
			var nextVal int
			switch char {
			case 'L':
				if prevValue-1 < 0 {
					nextVal = prevValue - 1
				} else {
					//try to start with most min value
					nextVal = 0
				}
			case 'R':
				nextVal = prevValue + 1
			case '=':
				nextVal = prevValue
			}
			//handle negative value
			if nextVal < 0 {
				offset := -nextVal
				decode[i+1] = nextVal + offset
				//loop check previousValue correct by code
				checkPreviousValue(decode[i+1], i, encode, decode, offset)

			} else {
				decode[i+1] = nextVal
			}

		}
	}

	fmt.Println(decode)

}

func checkPreviousValue(updatedVal int, index int, encode string, decode []int, offset int) {
	char := string(encode[index])
	switch char {
	case "L":
		// if previousValue and updatedVal not correct by own code condition > < =
		if !(decode[index] > updatedVal) {
			if index == 1 {
				decode[0], decode[1] = decode[0]+offset, decode[1]+offset
				break
			} else {
				decode[index] += offset
				//recursive check previousValue continue
				checkPreviousValue(decode[index], index-1, encode, decode, offset)
			}
		} else {
			break //stop check previousValue already correct by own code
		}
	case "R":
		if !(decode[index] < updatedVal) {
			if index == 1 {
				decode[0], decode[1] = decode[0]+offset, decode[1]+offset
				break
			} else {
				decode[index] += offset
				checkPreviousValue(decode[index], index-1, encode, decode, offset)
			}
		} else {
			break
		}
	case "=":
		if !(decode[index] == updatedVal) {
			if index == 1 {
				decode[0], decode[1] = decode[0]+offset, decode[1]+offset
				break
			} else {
				decode[index] += offset
				checkPreviousValue(decode[index], index-1, encode, decode, offset)
			}
		} else {
			break
		}
	}
}
