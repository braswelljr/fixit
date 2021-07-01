#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
@import Firebase;

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
[FIRApp configure];
@property (nonatomic, strong) UIWindow *window;

@end
