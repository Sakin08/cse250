import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDestinations } from '../../contexts/DestinationsContext';
import { X, Plus, Calendar, Image, Check } from 'lucide-react';

const AdminPackageForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPackageById, addPackage, updatePackage } = useDestinations();
  
  const isEditMode = !!id;
  const existingPackage = isEditMode ? getPackageById(id) : null;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: 0,
    duration: 1,
    imageUrl: '',
    featured: false,
    inclusions: [''],
    availableDates: ['']
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing package data when in edit mode
  useEffect(() => {
    if (isEditMode && existingPackage) {
      setFormData({
        title: existingPackage.title,
        description: existingPackage.description,
        location: existingPackage.location,
        price: existingPackage.price,
        duration: existingPackage.duration,
        imageUrl: existingPackage.imageUrl,
        featured: existingPackage.featured,
        inclusions: [...existingPackage.inclusions],
        availableDates: [...existingPackage.availableDates]
      });
    }
  }, [isEditMode, existingPackage]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.duration < 1) newErrors.duration = 'Duration must be at least 1 day';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    
    // Validate all inclusions
    const emptyInclusions = formData.inclusions.some(inclusion => !inclusion.trim());
    if (emptyInclusions) newErrors.inclusions = 'All inclusions must be filled';
    
    // Validate all dates
    const emptyDates = formData.availableDates.some(date => !date.trim());
    if (emptyDates) newErrors.availableDates = 'All dates must be filled';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleInclusionChange = (index: number, value: string) => {
    const updatedInclusions = [...formData.inclusions];
    updatedInclusions[index] = value;
    setFormData(prev => ({ ...prev, inclusions: updatedInclusions }));
  };

  const handleDateChange = (index: number, value: string) => {
    const updatedDates = [...formData.availableDates];
    updatedDates[index] = value;
    setFormData(prev => ({ ...prev, availableDates: updatedDates }));
  };

  const addInclusion = () => {
    setFormData(prev => ({ ...prev, inclusions: [...prev.inclusions, ''] }));
  };

  const removeInclusion = (index: number) => {
    const updatedInclusions = [...formData.inclusions];
    updatedInclusions.splice(index, 1);
    setFormData(prev => ({ ...prev, inclusions: updatedInclusions }));
  };

  const addDate = () => {
    setFormData(prev => ({ ...prev, availableDates: [...prev.availableDates, ''] }));
  };

  const removeDate = (index: number) => {
    const updatedDates = [...formData.availableDates];
    updatedDates.splice(index, 1);
    setFormData(prev => ({ ...prev, availableDates: updatedDates }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (isEditMode && id) {
        updatePackage(id, { ...formData, ratings: existingPackage?.ratings || [] });
      } else {
        addPackage({
          ...formData,
          ratings: []
        });
      }
      
      navigate('/admin/packages');
    } catch (error) {
      console.error('Error saving package:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditMode && !existingPackage) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Package Not Found</h1>
        <p className="text-gray-600 mb-4">The package you're trying to edit doesn't exist.</p>
        <button
          onClick={() => navigate('/admin/packages')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Packages
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Package' : 'Add New Package'}
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Package Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`block w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>
          
          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={`block w-full px-3 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
          </div>
          
          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (per person) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                className={`block w-full pl-7 px-3 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
            {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
          </div>
          
          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duration (days) *
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              min="1"
              value={formData.duration}
              onChange={handleInputChange}
              className={`block w-full px-3 py-2 border ${errors.duration ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
          </div>
          
          {/* Image URL */}
          <div className="md:col-span-2">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL *
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Image className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className={`block w-full pl-10 px-3 py-2 border ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              {formData.imageUrl && (
                <div className="h-12 w-12 flex-shrink-0">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
              )}
            </div>
            {errors.imageUrl && <p className="mt-1 text-sm text-red-500">{errors.imageUrl}</p>}
          </div>
          
          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className={`block w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            ></textarea>
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>
          
          {/* Featured */}
          <div className="md:col-span-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Featured Package (will be highlighted on the homepage)
              </label>
            </div>
          </div>
        </div>
        
        {/* Inclusions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              What's Included *
            </label>
            <button
              type="button"
              onClick={addInclusion}
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4" />
              Add Inclusion
            </button>
          </div>
          
          {errors.inclusions && <p className="text-sm text-red-500 mb-2">{errors.inclusions}</p>}
          
          <div className="space-y-2">
            {formData.inclusions.map((inclusion, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-grow relative">
                  <input
                    type="text"
                    value={inclusion}
                    onChange={(e) => handleInclusionChange(index, e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Inclusion ${index + 1}`}
                  />
                  <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                    <Check className="h-4 w-4 text-green-500" />
                  </div>
                </div>
                {formData.inclusions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInclusion(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Available Dates */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Available Dates *
            </label>
            <button
              type="button"
              onClick={addDate}
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4" />
              Add Date
            </button>
          </div>
          
          {errors.availableDates && <p className="text-sm text-red-500 mb-2">{errors.availableDates}</p>}
          
          <div className="space-y-2">
            {formData.availableDates.map((date, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => handleDateChange(index, e.target.value)}
                    className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {formData.availableDates.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDate(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/packages')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Package' : 'Create Package'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPackageForm;