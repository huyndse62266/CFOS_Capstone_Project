import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
  Button,
  Thumbnail,
  Title
} from "native-base";
import { FlatList, Dimensions, View, StatusBar,ScrollView } from "react-native";

const { width } = Dimensions.get("window");
export default class PrivacyPolicy extends Component {
  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Header
          style={{
            backgroundColor: "transparent"
          }}
        >
          <Left>
            <Button transparent>
              <Icon
                style={{
                  color: "black"
                }}
                name="arrow-back"
                onPress={() => this.props.navigation.goBack()}
              />
            </Button>
          </Left>
          <Body>
            <Title
              style={{
                color: "black"
              }}
            >
              Chính sách bảo mật
            </Title>
          </Body>
        </Header>
        <ScrollView showsVerticalScrollIndicator={false}
          style={{
            padding: 15
          }}
        >
          <Text style={{
              padding: 15,
            
              
            }}>
            Vui lòng đọc các điều khoản dịch vụ được cung cấp dưới đây (Điều khoản sử dụng) một cách cẩn thận. Bằng cách sử dụng Dịch vụ này, bạn đồng ý
rằng bạn đã đọc, hiểu, chấp nhận và đồng ý với các Điều khoản sử dụng. Bạn cũng đồng ý với các đại diện do chính bạn thực hiện phía dưới. Nếu bạn không đồng ý hoặc nằm trong Điều khoản sử dụng của dịch vụ (như được định nghĩa dưới đây) và muốn ngừng sử dụng dịch vụ, vui lòng không tiếp tục sử dụng Ứng dụng hoặc Dịch vụ này.
          </Text>
          <Text style={{
              padding: 15,
            
              
            }}>
            Các Điều khoản sử dụng này tạo thành một thỏa thuận pháp lý giữa bạn và
CÔNG TY TNHH PRESSMEAL (Công ty số 0312650437) (Công ty trực tiếp).
Để sử dụng Dịch vụ (mỗi dịch vụ như được xác định bên dưới), bạn phải đồng ý
theo Điều khoản sử dụng được nêu dưới đây. Bằng cách sử dụng điện thoại di động
ứng dụng hoặc trang web do Công ty cung cấp cho bạn (
Ứng dụng ngay lập tức, và tải xuống, cài đặt hoặc sử dụng bất kỳ liên quan
phần mềm do Công ty cung cấp (Phần mềm trực tuyến) mà tổng thể
Mục đích là để cho phép những người tìm kiếm dịch vụ vận chuyển đến
một số điểm đến phù hợp với vận chuyển của bên thứ ba
nhà cung cấp, người lái xe và người điều khiển phương tiện (gọi chung là
Dịch vụ tại cung), bạn xin cam đoan và đồng ý ràng buộc
theo Điều khoản sử dụng, và mọi sửa đổi và bổ sung trong tương lai
Điều khoản sử dụng được công bố theo thời gian tại
http://www.PressMeal.com và / hoặc trong Ứng dụng.
          </Text>
          <Text style={{
              padding: 15,
            
              
            }}>
            Công ty có quyền sửa đổi, thay đổi và thay đổi Điều khoản
Sử dụng hoặc các chính sách của nó liên quan đến Dịch vụ bất cứ lúc nào vì nó
có vẻ phù hợp (bao gồm thêm hoặc xóa bất kỳ điều khoản nào). Như là
sửa đổi, thay đổi và hoặc thay đổi Điều khoản sử dụng hoặc thay đổi
các chính sách liên quan đến Dịch vụ sẽ có hiệu lực khi đăng
của một phiên bản cập nhật tại http://www.PressMeal.com. Bạn thừa nhận
và đồng ý rằng bạn có trách nhiệm xem xét các Điều khoản
Sử dụng thường xuyên và cả Điều khoản sử dụng áp dụng cho bất kỳ quốc gia nào
nơi bạn sử dụng Dịch vụ có thể khác với quốc gia nơi
bạn đã đăng ký Ứng dụng (Quốc gia Thay thế Quốc gia)
Sau đó, việc tiếp tục sử dụng Dịch vụ sau khi có bất kỳ thay đổi nào như vậy,
dù bạn có xem xét hay không, sẽ cấu thành sự đồng ý của bạn và
chấp nhận những thay đổi đó Bạn cũng đồng ý rằng việc sử dụng
Dịch vụ tại Quốc gia thay thế phải tuân theo Điều khoản của
Sử dụng phổ biến cho Quốc gia thay thế có thể được tìm thấy tại
http://www.PressMeal.com.
          </Text>
          <Text style={{
              padding: 15,
            }}>
          Công ty là một công ty công nghệ không cung cấp
dịch vụ vận chuyển hoặc giao hàng và công ty không phải là một
nhà cung cấp dịch vụ vận chuyển hoặc giao hàng (dịch vụ trên mạng
các nhà cung cấp"). Tùy thuộc vào các nhà cung cấp dịch vụ bên thứ ba cung cấp
dịch vụ vận chuyển hoặc giao hàng cho bạn và tùy thuộc vào bạn
chấp nhận các dịch vụ đó Dịch vụ của công ty là liên kết bạn với
các nhà cung cấp dịch vụ bên thứ ba như vậy, nhưng không có ý định
để cung cấp dịch vụ vận chuyển hoặc giao hàng hoặc bất kỳ hành động nào có thể
nhà cung cấp dịch vụ. Công ty không có trách nhiệm
          </Text>
        </ScrollView>
      </Container>
    );
  }
}
