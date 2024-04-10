function showCategory(categoryId) {
    // Hide all category content sections
    const allCategoryContents = document.querySelectorAll('.category-content');
    allCategoryContents.forEach(content => {
        content.classList.remove('active');
    });

    // Show the selected category content
    const selectedCategoryContent = document.getElementById(categoryId);
    if (selectedCategoryContent) {
        selectedCategoryContent.classList.add('active');
    }
}