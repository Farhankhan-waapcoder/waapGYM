import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { mockSocialPosts, SocialPost } from "../../data/mockData";
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface GymMediaPageProps {
  user: any;
  gym: string;
  onNavigate: (view: string) => void;
}

export function GymMediaPage({ user, gym, onNavigate }: GymMediaPageProps) {
  const posts = mockSocialPosts.filter(p => p.gym.toLowerCase() === gym.toLowerCase());

  const handleUserClick = (post: SocialPost) => {
    // build profile navigation token based on role
    // we'll map role to type portion of profile route
    let type = post.role === 'trainer' ? 'trainer' : post.role === 'member' ? 'member' : 'trainer';
    // in absence of real user id mapping differences we reuse trainer/member
    onNavigate(`profile-${type}-${post.userId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{gym} Media</h1>
        <p className="text-muted-foreground text-sm">Latest member & trainer updates</p>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <Card key={post.id} className="hover-card border rounded-lg">
            <CardHeader className="flex flex-row items-start gap-3 pb-2">
              <Avatar className="h-10 w-10 cursor-pointer" onClick={() => handleUserClick(post)}>
                <AvatarImage src={post.userAvatar} />
                <AvatarFallback>{post.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <button onClick={() => handleUserClick(post)} className="font-medium hover:underline text-left text-sm">
                    {post.userName}
                  </button>
                  <Badge variant="outline" className="capitalize">{post.role.replace('_',' ')}</Badge>
                  <span className="text-[10px] text-muted-foreground">{new Date(post.createdAt).toLocaleTimeString()}</span>
                </div>
                <CardDescription className="pt-1 whitespace-pre-line leading-snug text-sm">{post.content}</CardDescription>
              </div>
            </CardHeader>
            {post.image && (
              <div className="px-3 pb-3">
                <div className="overflow-hidden rounded-md bg-muted/20">
                  <img src={post.image} alt="post" className="w-full max-h-64 object-cover" loading="lazy" />
                </div>
              </div>
            )}
            <CardContent className="pt-0 pb-3 px-3">
              <div className="flex items-center gap-6 md:gap-8 text-muted-foreground py-1">
                <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments.length}</span>
                </button>
                <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
        {posts.length === 0 && (
          <div className="text-sm text-muted-foreground border rounded-lg p-6 text-center">No posts yet for this gym.</div>
        )}
      </div>
    </div>
  );
}
