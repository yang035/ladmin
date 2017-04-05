<?php

namespace App\Http\Controllers\Admin\System;

use App\Repositories\Admin\OpenCityRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OpenCityController extends Controller
{
    //
    protected $openCity;
    public function __construct(OpenCityRepository $openCity)
    {
        $this->openCity = $openCity;
    }

    public function index(){
        $openCity = $this->openCity->getOpenCityList();
//        print_r($cities);
        return view('admin.system.open_city_index')->with('opencities',$openCity);
    }
    /**
     * Show the new post form
     */
    public function create()
    {
//        echo 123;exit();
//        $data = $this->dispatch(new PostFormFields());

        return view('admin.system.open_city_add');
    }

    /**
     * Store a newly created Post
     *
     * @param PostCreateRequest $request
     */
//    public function store(PostCreateRequest $request)
//    {
//        $post = Post::create($request->postFillData());
//        $post->syncTags($request->get('tags', []));
//
//        return redirect()
//            ->route('admin.post.index')
//            ->withSuccess('New Post Successfully Created.');
//    }

    /**
     * Show the post edit form
     *
     * @param int $id
     * @return Response
     */
//    public function edit($id)
//    {
//        $data = $this->dispatch(new PostFormFields($id));
//
//        return view('admin.post.edit', $data);
//    }

    /**
     * Update the Post
     *
     * @param PostUpdateRequest $request
     * @param int $id
     */
//    public function update(PostUpdateRequest $request, $id)
//    {
//        $post = Post::findOrFail($id);
//        $post->fill($request->postFillData());
//        $post->save();
//        $post->syncTags($request->get('tags', []));
//
//        if ($request->action === 'continue') {
//            return redirect()
//                ->back()
//                ->withSuccess('Post saved.');
//        }
//
//        return redirect()
//            ->route('admin.post.index')
//            ->withSuccess('Post saved.');
//    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
//    public function destroy($id)
//    {
//        $post = Post::findOrFail($id);
//        $post->tags()->detach();
//        $post->delete();
//
//        return redirect()
//            ->route('admin.post.index')
//            ->withSuccess('Post deleted.');
//    }
}
