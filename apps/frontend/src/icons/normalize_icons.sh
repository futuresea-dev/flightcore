#!/bin/bash

# Navigate to the icons directory
# cd apps/frontend/src/icons || exit

# Loop through all files in the directory
for file in *; do
  # Extract the file extension
  extension="${file##*.}"
  
  # Remove the numeric prefix and normalize the file name
  normalized_name=$(echo "${file%.*}" | sed 's/^[0-9]*_//' | tr '[:upper:]' '[:lower:]' | tr ' ' '_' | tr -cd '[:alnum:]_')
  
  # Truncate the name if it's longer than 50 characters
  if [ ${#normalized_name} -gt 50 ]; then
    normalized_name="${normalized_name:0:50}"
  fi
  
  # Append the file extension
  normalized_name="${normalized_name}.${extension}"
  
  # Rename the file if the normalized name is different
  if [ "$file" != "$normalized_name" ]; then
    mv "$file" "$normalized_name"
  fi
done

echo "File names normalized."