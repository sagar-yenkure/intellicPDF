import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ExtendedUser, PLANS } from "./Account";

interface SubscriptionCardProps {
  userPlan: keyof typeof PLANS;
  userData: ExtendedUser;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  userPlan,
  userData,
}) => {
  const { FILES: maxFiles, QUESTIONSPERFILE: maxQuestionsPerFile } =
    PLANS[userPlan];

  const uploadedFiles = userData?.files?.length ?? 0;
  const hasReachedFileLimit = uploadedFiles >= maxFiles;
  const uploadProgress = (uploadedFiles / maxFiles) * 100;

  return (
    <Card>
      <CardHeader className="bg-primary/5">
        <CardTitle>Plan Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {userData.nextBilling && (
          <div className="flex justify-between items-center py-3">
            <div>
              <h3 className="font-semibold">{userPlan}</h3>
              <p className="text-sm text-muted-foreground">
                Expires on {new Date(userData.nextBilling).toLocaleDateString()}
              </p>
            </div>
            <Badge variant="secondary">Active</Badge>
          </div>
        )}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Plan Usage</span>
            <span>
              Limited to {maxFiles} files & {maxQuestionsPerFile} questions per
              file
            </span>
          </div>
          <Progress value={uploadProgress} />
          {hasReachedFileLimit && (
            <p className="text-xs text-red-500 mt-1">
              ⚠️ You have reached your file upload limit.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
