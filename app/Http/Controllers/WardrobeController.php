<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WardrobeItem;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class WardrobeController extends Controller
{
    public function index()
    {
        $items = Auth::user()->wardrobeItems()->orderBy('created_at', 'desc')->get();
        return response()->json(['items' => $items]);
    }

    public function store(Request $request)
    {
        \Log::info('Wardrobe store method called');
        \Log::info('Request data:', $request->all());
        \Log::info('Files:', $request->allFiles());

        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'category' => 'required|string|max:255',
                'subcategory' => 'nullable|string|max:255',
                'color' => 'required|string|max:255',
                'size' => 'required|string|max:255',
                'brand' => 'nullable|string|max:255',
                'condition' => 'required|in:new,like_new,good,fair,poor',
                'price' => 'nullable|numeric|min:0',
                'is_for_sale' => 'required|in:0,1,true,false',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            \Log::info('Validation passed');

            $imagePath = $request->file('image')->store('wardrobe', 'public');
            \Log::info('Image stored at:', ['path' => $imagePath]);

            $item = WardrobeItem::create([
                'user_id' => Auth::id(),
                'name' => $request->name,
                'description' => $request->description,
                'category' => $request->category,
                'subcategory' => $request->subcategory,
                'color' => $request->color,
                'size' => $request->size,
                'brand' => $request->brand,
                'condition' => $request->condition,
                'price' => $request->is_for_sale ? $request->price : null,
                'is_for_sale' => in_array($request->is_for_sale, ['1', 'true', true], true),
                'image_path' => $imagePath,
                'tags' => $request->tags ?? []
            ]);

            \Log::info('Item created:', $item->toArray());

            return response()->json([
                'success' => true,
                'message' => 'Item added to wardrobe successfully!',
                'item' => $item
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in wardrobe store:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error adding item: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $item = Auth::user()->wardrobeItems()->findOrFail($id);
        return response()->json(['item' => $item]);
    }

    public function update(Request $request, $id)
    {
        \Log::info('Wardrobe update method called for item:', ['id' => $id]);
        \Log::info('Request data:', $request->all());
        \Log::info('Files:', $request->allFiles());

        try {
            $item = Auth::user()->wardrobeItems()->findOrFail($id);

            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'category' => 'required|string|max:255',
                'subcategory' => 'nullable|string|max:255',
                'color' => 'required|string|max:255',
                'size' => 'required|string|max:255',
                'brand' => 'nullable|string|max:255',
                'condition' => 'required|in:new,like_new,good,fair,poor',
                'price' => 'nullable|numeric|min:0',
                'is_for_sale' => 'required|in:0,1,true,false',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            \Log::info('Validation passed');

            $updateData = [
                'name' => $request->name,
                'description' => $request->description,
                'category' => $request->category,
                'subcategory' => $request->subcategory,
                'color' => $request->color,
                'size' => $request->size,
                'brand' => $request->brand,
                'condition' => $request->condition,
                'price' => in_array($request->is_for_sale, ['1', 'true', true], true) ? $request->price : null,
                'is_for_sale' => in_array($request->is_for_sale, ['1', 'true', true], true)
            ];

            // Handle image upload if provided
            if ($request->hasFile('image')) {
                // Delete old image
                if (Storage::disk('public')->exists($item->image_path)) {
                    Storage::disk('public')->delete($item->image_path);
                }
                
                // Store new image
                $imagePath = $request->file('image')->store('wardrobe', 'public');
                $updateData['image_path'] = $imagePath;
                
                \Log::info('New image stored at:', ['path' => $imagePath]);
            }

            $item->update($updateData);

            \Log::info('Item updated:', $item->toArray());

            return response()->json([
                'success' => true,
                'message' => 'Item updated successfully!',
                'item' => $item
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in wardrobe update:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error updating item: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $item = Auth::user()->wardrobeItems()->findOrFail($id);
        
        // Delete the image file
        if (Storage::disk('public')->exists($item->image_path)) {
            Storage::disk('public')->delete($item->image_path);
        }
        
        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Item removed from wardrobe successfully!'
        ]);
    }
}
