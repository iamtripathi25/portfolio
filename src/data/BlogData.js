// Supported body blocks:
//   { type: 'p', text }
//   { type: 'h2', text }                      also becomes a Contents entry in the sidebar
//   { type: 'quote', text }
//   { type: 'code', lang, code, filename?, caption? }
//
// Code blocks are syntax highlighted at build time; `lang` takes any Shiki language
// ('javascript', 'python', 'go', 'sql', 'bash', ...). Example:
//   {
//     type: 'code',
//     lang: 'javascript',
//     filename: 'circuit-breaker.js',
//     code: `
// const breaker = new CircuitBreaker({ threshold: 5 })
// `,
//     caption: 'Optional line under the block for the explanation.',
//   }
//
// Optional per-post: `references: [{ label, url, note? }]` renders in the sidebar.
//
// `category` drives the filter on /blog/. Categories are derived from the posts
// themselves, so inventing a new one is just typing it on a post.
//
// Optional `topic` nests a category under a parent — it shows as "Algorithms > Sorting"
// in the byline, and groups the category under that topic in the filter list. Filtering
// by the topic selects every category beneath it. Posts without a topic stay top level.

export const BlogData = [
  {
    slug: 'insertion-sort',
    title: 'Insertion sort',
    date: '2026-08-19',
    readingTime: '2 min',
    topic: 'Algorithms',
    category: 'Sorting',
    excerpt:
      'Core idea: grow a sorted region one element at a time, shifting the bigger elements right to open a gap for the next one.',
    body: [
      {
        type: 'quote',
        text: 'Grow a sorted region one element at a time, shifting the bigger elements right to open a gap for the next one.',
      },
      {
        type: 'p',
        text: 'Incremental approach. Deck of cards: the left hand holds the cards already in order, the right hand the pile you have not looked at yet.',
      },
      {
        type: 'code',
        lang: 'text',
        filename: 'the sorting problem',
        code: `
Input:  A sequence of n numbers (a1, a2, a3 ... an)
Output: A permutation (reordering) of (a1, a2, a3 ... an)
        such that a1 <= a2 <= a3 <= ... <= an
`,
        caption:
          'Two requirements, not one: the order has to be right, and the elements have to be the same ones that went in.',
      },
      { type: 'h2', text: 'The algorithm' },
      {
        type: 'code',
        lang: 'python',
        filename: 'insertion_sort.py',
        code: `
def insertionsort(arr):
    for i in range(1, len(arr)):   # from the 2nd element to the last
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]    # shift the bigger element one slot right
            j = j - 1
        arr[j + 1] = key           # drop the key into its correct position
    return arr


arr = [5, 2, 4, 6, 1, 3]
print(insertionsort(arr))
`,
      },
      { type: 'h2', text: 'Why it is correct' },
      {
        type: 'p',
        text: 'A[1:i-1] — the sorted hand — is the loop invariant: true before the loop starts, preserved by every iteration, and at termination it covers the whole array. That is the correctness argument, and it does not depend on trying examples.',
      },
      { type: 'h2', text: 'Cost' },
      {
        type: 'p',
        text: 'O(n) best case, when the array is already sorted and the inner while fails immediately. O(n^2) worst case, when it is reversed and every element shifts past all of the ones before it. Sorts in place, no extra memory. Efficient for a small number of elements.',
      },
    ],
    references: [
      {
        label: 'Introduction to Algorithms, 4th Edition (CLRS)',
        url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
        note: 'Cormen, Leiserson, Rivest, and Stein. Chapters 1-2.',
      },
    ],
  },
  {
    slug: 'divide-and-conquer',
    title: 'Divide and conquer',
    date: '2026-08-19',
    readingTime: '2 min',
    topic: 'Algorithms',
    category: 'Approach',
    excerpt:
      'Core idea: the same problem on a smaller input, solved recursively, then combined — and a base case that stops the recursion.',
    body: [
      {
        type: 'quote',
        text: 'The same problem on a smaller input, solved recursively, then combined — with a base case that stops the recursion.',
      },
      {
        type: 'p',
        text: 'Break the problem into several subproblems that are similar to the original but smaller in size, solve the subproblems recursively, then combine those solutions into a solution for the original problem.',
      },
      { type: 'h2', text: 'Base case' },
      {
        type: 'p',
        text: 'Small enough to solve directly, without recursing.',
      },
      { type: 'h2', text: 'Recursive case' },
      {
        type: 'p',
        text: 'Three characteristic steps. Divide the problem into one or more subproblems that are smaller instances of the same problem. Conquer the subproblems by solving them recursively. Combine the subproblem solutions to form a solution to the original problem.',
      },
      {
        type: 'p',
        text: 'Smaller instances of the same problem, not merely similar-looking work — it is the same routine called on a shorter input, which is what lets the recursion close.',
      },
      { type: 'h2', text: 'Where it bottoms out' },
      {
        type: 'p',
        text: 'The recursion bottoms out when it reaches the base case. In merge sort that is the subarray A[p:r] having just one element — when p equals r — since a single element is already sorted.',
      },
      {
        type: 'p',
        text: 'Merge sort is the worked example: the divide is one midpoint, the conquer is two recursive calls that do no ordering of their own, and every decision that actually sorts anything happens in the combine step.',
      },
    ],
    references: [
      {
        label: 'Introduction to Algorithms, 4th Edition (CLRS)',
        url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
        note: 'Cormen, Leiserson, Rivest, and Stein. Chapters 1-2.',
      },
    ],
  },
  {
    slug: 'merge-sort',
    title: 'Merge sort',
    date: '2026-08-19',
    readingTime: '3 min',
    topic: 'Algorithms',
    category: 'Sorting',
    excerpt:
      'Core idea: splitting is trivial — the sorting happens when two already-sorted halves are merged back into one.',
    body: [
      {
        type: 'quote',
        text: 'Splitting is trivial. The sorting happens when two already-sorted halves are merged back into one.',
      },
      {
        type: 'p',
        text: 'Divide and conquer applied to sorting, mapping onto the three steps directly.',
      },
      {
        type: 'code',
        lang: 'text',
        filename: 'merge sort',
        code: `
Input:   A[1:n]
Divide:  the subarray A[p:r] into A[p:q] and A[q+1:r], where q is the midpoint
Conquer: sort each of the two subarrays recursively using merge sort
Combine: merge the two sorted subarrays A[p:q] and A[q+1:r] back into A[p:r]
`,
      },
      { type: 'h2', text: 'The algorithm' },
      {
        type: 'code',
        lang: 'python',
        filename: 'merge_sort.py',
        code: `
def mergesort(arr, startIndex, endIndex):
    if startIndex >= endIndex:          # base case: one element, already sorted
        return arr
    midIndex = (startIndex + endIndex) // 2
    mergesort(arr, startIndex, midIndex)
    mergesort(arr, midIndex + 1, endIndex)
    merger(arr, startIndex, endIndex, midIndex)
    return arr


def merger(arr, startIndex, endIndex, midIndex):
    leftarr = arr[startIndex:midIndex + 1]
    rightarr = arr[midIndex + 1:endIndex + 1]
    i = j = 0
    k = startIndex

    while i < len(leftarr) and j < len(rightarr):
        if leftarr[i] <= rightarr[j]:
            arr[k] = leftarr[i]
            i = i + 1
        else:
            arr[k] = rightarr[j]
            j = j + 1
        k = k + 1

    while i < len(leftarr):             # drain whatever one side has left
        arr[k] = leftarr[i]
        i = i + 1
        k = k + 1

    while j < len(rightarr):
        arr[k] = rightarr[j]
        j = j + 1
        k = k + 1


arr = [6, 5, 4, 3, 2, 1, 10]
print(mergesort(arr, 0, len(arr) - 1))
`,
        caption:
          'mergesort is a midpoint and two calls. Every decision that actually orders anything happens inside merger.',
      },
      { type: 'h2', text: 'The combine step' },
      {
        type: 'p',
        text: 'The key operation: merging two adjacent, sorted subarrays. Compare the heads of both, take the smaller, advance that cursor. When one side runs out the other is already sorted, so its remainder is appended without further comparisons.',
      },
      {
        type: 'p',
        text: 'One detail: the comparison is leftarr[i] <= rightarr[j], not <. On a tie the left half goes first, so equal elements keep their original order. That single character is what makes merge sort stable.',
      },
      { type: 'h2', text: 'Cost' },
      {
        type: 'p',
        text: 'O(n log n) in every case — log n levels of halving, O(n) work merging at each level. Space is O(n), because merger copies both halves out before writing back.',
      },
      {
        type: 'p',
        text: 'Against insertion sort: that one sorts in place and spends no extra memory, but has no worst-case guarantee. Merge sort buys its guarantee with O(n) of it.',
      },
    ],
    references: [
      {
        label: 'Introduction to Algorithms, 4th Edition (CLRS)',
        url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
        note: 'Cormen, Leiserson, Rivest, and Stein. Chapters 1-2.',
      },
    ],
  },
  {
    slug: 'why-i-am-keeping-this-journal',
    title: 'Why I am keeping this journal',
    date: '2026-08-16',
    readingTime: '3 min',
    category: 'Journal',
    excerpt:
      'Give it a year and I cannot tell you how I solved something, only that I did. So this is the reference I leave behind.',
    body: [
      {
        type: 'p',
        text: 'I forget things. Give it six months and the details of something I built go soft at the edges; a year later I can only tell you that I solved it, not how. The understanding does not survive on its own — it survives if I left a reference behind.',
      },
      {
        type: 'p',
        text: 'So that is what this is. Working notes, closer to a lab notebook than a blog: what broke, what I misunderstood, and what I would do differently. Public, because it is harder to hand-wave a step when a reader could ask about it.',
      },
      { type: 'h2', text: 'A deliberate detox' },
      {
        type: 'p',
        text: 'Writing this is also how I detox from AI. Not because the tools are bad — they are genuinely useful, and I use them. But reaching for one the moment a problem gets uncomfortable is how I stopped noticing that I had quietly outsourced the thinking. Sitting with a problem until I actually understand it is a muscle, and it weakens fast when something else lifts for me.',
      },
      {
        type: 'quote',
        text: 'Using an AI tool is good. Letting it do the part I should be doing is not — at least not from where I stand.',
      },
      {
        type: 'p',
        text: 'So the ideas here are mine. Every entry starts from something I built, broke, or read closely enough to have an opinion about, and anything borrowed gets credited in the references. I may use a tool to tighten a muddled paragraph or push me to explain a step I skipped, but the understanding comes first and the tool comes after.',
      },
    ],
  },
]
