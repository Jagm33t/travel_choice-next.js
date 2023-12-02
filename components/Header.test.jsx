import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header'; // Adjust the import path as needed

describe('Header Component', () => {
  const mockSetType = jest.fn();
  const mockSetRatings = jest.fn();
  const mockSetSearchInput = jest.fn();

  beforeEach(() => {
    render(<Header 
      setType={mockSetType} 
      setRatings={mockSetRatings} 
      setSearchInput={mockSetSearchInput} 
      searchInput="" 
    />);
  });

  test('renders Header component', () => {
    expect(screen.getByPlaceholderText('Search here...')).toBeInTheDocument();
  });

  test('allows typing in the search input', () => {
    const searchInput = screen.getByPlaceholderText('Search here...');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    expect(mockSetSearchInput).toHaveBeenCalledWith('test search');
  });

  test('calls setType when a type button is clicked', () => {
    const restaurantButton = screen.getByText('Restaurants');
    fireEvent.click(restaurantButton);
    expect(mockSetType).toHaveBeenCalledWith('restaurants');

    const hotelButton = screen.getByText('Hotels');
    fireEvent.click(hotelButton);
    expect(mockSetType).toHaveBeenCalledWith('hotels');

    const attractionsButton = screen.getByText('Attractions');
    fireEvent.click(attractionsButton);
    expect(mockSetType).toHaveBeenCalledWith('attractions');
  });

  test('calls setRatings when a rating menu item is clicked', () => {
    // Open the menu
    fireEvent.click(screen.getByText('Choose ratings'));
    
    // Click on a menu item
    const menuItem = screen.getByText('4.0');
    fireEvent.click(menuItem);

    expect(mockSetRatings).toHaveBeenCalledWith(4);
  });
});
