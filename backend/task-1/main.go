package main

import (
	"encoding/json"
	"fmt"
	"io"
	"math"
	"os"
	"slices"
)

func main() {
	field, err := os.Open("hard.json")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer field.Close()

	bytes, err := io.ReadAll(field)

	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	var datas [][]int

	err = json.Unmarshal(bytes, &datas)

	if err != nil {
		fmt.Println("Error parsing JSON:", err)
		return
	}
	
	maxSlice := make([][]int, len(datas))
	maxSlice[0] = datas[0]

	for index := 1; index < len(datas); index++ {
		maxSlice[index] = findMax(datas[index], maxSlice, index)
	}

	maxBottomNode := maxSlice[len(maxSlice)-1]
	fmt.Print((slices.Max(maxBottomNode))) //print result

}

func findMax(nodes []int, maxSlice [][]int, currentIndex int) []int {
	//find parend node
	for index, data := range nodes {
		//only have 1 parent at first index of node before
		if index == 0 {
			nodes[index] = maxSlice[currentIndex-1][0] + data
		} else if index == len(nodes)-1 {
			//only have 1 parent at last index of node before
			lastIndex := len(maxSlice[currentIndex-1]) - 1
			nodes[index] = maxSlice[currentIndex-1][lastIndex] + data
		} else {
			//have 2 parend node
			maxValueParent := math.Max(float64(maxSlice[currentIndex-1][index-1]), float64(maxSlice[currentIndex-1][index])) //choose max value from both node before
			nodes[index] = int(maxValueParent) + data
		}

	}
	return nodes
}
