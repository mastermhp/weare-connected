// import { notFound } from "next/navigation"
// import Image from "next/image"
// import Link from "next/link"
// import { ArrowLeft, Calendar, Clock, Share2, Bookmark, User } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import Footer from "@/app/components/footer"
// // import { blogPosts, getBlogPost } from "@/app/lib/data"
// import Header from "@/app/components/header"

// // Related posts - in a real app, this would be fetched based on tags/category
// const getRelatedPosts = (currentPost) => {
//   return blogPosts
//     .filter((post) => post.slug !== currentPost.slug && post.category === currentPost.category)
//     .slice(0, 3)
// }

// export default async function BlogPost({ params }) {
//   const post = await getBlogPost(params.slug)

//   if (!post) {
//     notFound()
//   }

//   const relatedPosts = getRelatedPosts(post)

//   return (
//     <>
//       <Header />
//       <div className="min-h-screen pt-20 bg-white">
//         {/* Navigation */}
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to Blog
//           </Link>
//         </div>

//         {/* Hero Section */}
//         <article className="container mx-auto px-4 pb-12">
//           <div className="max-w-4xl mx-auto">
//             {/* Header */}
//             <header className="mb-8">
//               <div className="flex items-center gap-2 mb-4">
//                 <Badge variant="secondary">{post.category}</Badge>
//                 <span className="text-sm text-gray-500">•</span>
//                 <span className="text-sm text-gray-500">{post.readTime}</span>
//               </div>

//               <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

//               <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>

//               {/* Author and Meta Info */}
//               <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
//                 <div className="flex items-center space-x-4">
//                   <Image
//                     src={post.authorImage || "/placeholder.svg?height=48&width=48"}
//                     alt={post.author}
//                     width={48}
//                     height={48}
//                     className="rounded-full"
//                   />
//                   <div>
//                     <div className="font-semibold text-gray-900">{post.author}</div>
//                     <div className="text-sm text-gray-600">{post.authorRole}</div>
//                   </div>
//                   <Separator orientation="vertical" className="h-8" />
//                   <div className="flex items-center text-sm text-gray-600">
//                     <Calendar className="w-4 h-4 mr-1" />
//                     {new Date(post.publishedAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </div>
//                   <div className="flex items-center text-sm text-gray-600">
//                     <Clock className="w-4 h-4 mr-1" />
//                     {post.readTime}
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <Button variant="outline" size="sm">
//                     <Share2 className="w-4 h-4 mr-2" />
//                     Share
//                   </Button>
//                   <Button variant="outline" size="sm">
//                     <Bookmark className="w-4 h-4 mr-2" />
//                     Save
//                   </Button>
//                 </div>
//               </div>
//             </header>

//             {/* Featured Image */}
//             <div className="mb-12">
//               <Image
//                 src={post.image || "/placeholder.svg?height=400&width=800"}
//                 alt={post.title}
//                 width={800}
//                 height={400}
//                 className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
//               />
//             </div>

//             {/* Content */}
//             <div className="prose prose-lg max-w-none mb-12">
//               <div className="text-gray-700 leading-relaxed space-y-6">
//                 {post.content.split("\n\n").map((paragraph, index) => (
//                   <p key={index} className="text-lg">
//                     {paragraph}
//                   </p>
//                 ))}
//               </div>
//             </div>

//             {/* Tags */}
//             <div className="mb-12">
//               <h3 className="text-lg font-semibold mb-4">Tags</h3>
//               <div className="flex flex-wrap gap-2">
//                 {post.tags.map((tag, index) => (
//                   <Badge key={index} variant="outline">
//                     {tag}
//                   </Badge>
//                 ))}
//               </div>
//             </div>

//             <Separator className="mb-12" />

//             {/* Author Bio */}
//             <div className="bg-gray-50 rounded-lg p-8 mb-12">
//               <div className="flex items-start space-x-4">
//                 <Image
//                   src={post.authorImage || "/placeholder.svg?height=80&width=80"}
//                   alt={post.author}
//                   width={80}
//                   height={80}
//                   className="rounded-full"
//                 />
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">{post.author}</h3>
//                   <p className="text-gray-600 mb-4">{post.authorRole}</p>
//                   <p className="text-gray-700">
//                     {post.author} is a leading expert in {post.category.toLowerCase()}, helping businesses navigate the
//                     complexities of modern technology adoption and digital transformation.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Related Posts */}
//             {relatedPosts.length > 0 && (
//               <section>
//                 <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
//                 <div className="grid md:grid-cols-3 gap-6">
//                   {relatedPosts.map((relatedPost) => (
//                     <Link
//                       key={relatedPost.id}
//                       href={`/blog/${relatedPost.slug}`}
//                       className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border"
//                     >
//                       <Image
//                         src={relatedPost.image || "/placeholder.svg?height=200&width=300"}
//                         alt={relatedPost.title}
//                         width={300}
//                         height={200}
//                         className="w-full h-48 object-cover rounded-t-lg"
//                       />
//                       <div className="p-4">
//                         <Badge variant="secondary" className="mb-2">
//                           {relatedPost.category}
//                         </Badge>
//                         <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
//                           {relatedPost.title}
//                         </h3>
//                         <div className="flex items-center text-sm text-gray-500">
//                           <User className="w-3 h-3 mr-1" />
//                           {relatedPost.author}
//                           <span className="mx-2">•</span>
//                           <Clock className="w-3 h-3 mr-1" />
//                           {relatedPost.readTime}
//                         </div>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </section>
//             )}
//           </div>
//         </article>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export async function generateStaticParams() {
//   return blogPosts.map((post) => ({
//     slug: post.slug,
//   }))
// }

// export async function generateMetadata({ params }) {
//   const post = await getBlogPost(params.slug)

//   if (!post) {
//     return {
//       title: "Post Not Found",
//     }
//   }

//   return {
//     title: `${post.title} | Connected Blog`,
//     description: post.excerpt,
//     openGraph: {
//       title: post.title,
//       description: post.excerpt,
//       images: [post.image],
//     },
//   }
// }
