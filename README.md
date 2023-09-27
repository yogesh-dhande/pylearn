# Python exercises

Increment filenames by 1

`brew install rename`
`rename -n 's/(\d+)/sprintf("%04d", $1+1)/e' *[0-9][0-9][0-9][0-9]*.md`
