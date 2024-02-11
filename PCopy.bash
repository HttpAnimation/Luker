#!/bin/bash

# Ensure that the stable directory exists
if [ ! -d "stable" ]; then
    echo "Error: 'stable' directory not found"
    exit 1
fi

# Copy the contents of the stable directory recursively to the Desktop
cp -r stable ~/Desktop/

# Check if the copy operation was successful
if [ $? -eq 0 ]; then
    echo "Successfully copied 'stable' directory to Desktop"
else
    echo "Error: Failed to copy 'stable' directory to Desktop"
    exit 1
fi

# Move the stable directory to Luker on the Desktop
mv ~/Desktop/stable ~/Desktop/Luker

# Check if the move operation was successful
if [ $? -eq 0 ]; then
    echo "Successfully moved 'stable' directory to Luker on Desktop"
else
    echo "Error: Failed to move 'stable' directory to Luker on Desktop"
    exit 1
fi

echo "Script execution completed successfully"
